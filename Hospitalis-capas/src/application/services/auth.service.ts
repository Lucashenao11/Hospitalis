/**
 * CAPA DE APLICACIÓN — AuthService
 *
 * Contiene la lógica de negocio de autenticación: login, registro,
 * recuperación y reset de contraseña.
 *
 * Diferencia clave con la arquitectura por módulos:
 * - Este servicio importa desde 'domain/' y 'infrastructure/', NO de 'auth/'
 * - La separación por capas queda EXPLÍCITA en los imports
 *
 * La capa de Aplicación:
 * ✓ Conoce la capa de Dominio (entidades, interfaces)
 * ✓ Usa la capa de Infraestructura (schemas de Mongoose via inyección)
 * ✗ No conoce la capa de Presentación (no importa controllers ni DTOs HTTP)
 */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt   from 'bcrypt';
import * as crypto   from 'crypto';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { JwtService }    from '@nestjs/jwt';

import { UsersService } from './users.service';
import { LoginDto }     from '../../presentation/dto/auth/login.dto';
import { RegisterDto }  from '../../presentation/dto/auth/register.dto';
import {
  PasswordResetTokenSchema,
  PasswordResetTokenDocument,
} from '../../infrastructure/persistence/schemas/password-reset.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectModel(PasswordResetTokenSchema.name)
    private readonly resetTokenModel: Model<PasswordResetTokenDocument>,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new BadRequestException('Credenciales inválidas');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new BadRequestException('Credenciales inválidas');

    const payload = {
      sub:      user['_id'],
      email:    user.email,
      role:     user.role,
      fullName: user.fullname,
    };
    return { accessToken: this.jwtService.sign(payload) };
  }

  async register(registerDto: RegisterDto) {
    const { fullName, email, password } = registerDto;
    const existing = await this.usersService.findByEmail(email);
    if (existing) throw new BadRequestException('Credenciales inválidas');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.usersService.create({
      fullname: fullName,
      email,
      password: hashedPassword,
    });

    return { message: 'Usuario registrado exitosamente', userId: user['_id'] };
  }

  async forgotPassword(email: string): Promise<{ message: string }> {
    const GENERIC = {
      message: 'Si el correo está registrado, recibirás un enlace de recuperación.',
    };

    const user = await this.usersService.findByEmail(email);
    if (!user) return GENERIC;

    await this.resetTokenModel.updateMany(
      { userId: user['_id'], used: false },
      { $set: { used: true } },
    );

    const token     = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    await this.resetTokenModel.create({ token, userId: user['_id'], expiresAt, used: false });

    const frontendUrl = this.configService.get<string>('FRONTEND_URL');
    const resetLink   = `${frontendUrl}/reset-password?token=${token}`;
    await this.sendResetEmail(email, user['fullname'], resetLink);

    return GENERIC;
  }

  async resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
    const resetToken = await this.resetTokenModel.findOne({ token });
    if (!resetToken)          throw new BadRequestException('Token inválido o inexistente');
    if (resetToken.used)      throw new BadRequestException('Este enlace ya fue utilizado');
    if (resetToken.expiresAt < new Date()) {
      throw new BadRequestException('El enlace ha expirado. Solicita uno nuevo');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.usersService.updatePassword(String(resetToken.userId), hashedPassword);
    await this.resetTokenModel.findByIdAndUpdate(resetToken._id, { $set: { used: true } });

    return { message: 'Contraseña actualizada exitosamente' };
  }

  private async sendResetEmail(to: string, name: string, resetLink: string): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: this.configService.get<string>('MAILTRAP_HOST'),
      port: this.configService.get<number>('MAILTRAP_PORT'),
      auth: {
        user: this.configService.get<string>('MAILTRAP_USER'),
        pass: this.configService.get<string>('MAILTRAP_PASS'),
      },
    });

    await transporter.sendMail({
      from:    `"Hospitalis" <${this.configService.get('MAIL_FROM')}>`,
      to,
      subject: 'Recuperación de contraseña — Hospitalis',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:32px;">
          <h3>Hola, ${name}</h3>
          <p>Haz clic en el botón para crear una nueva contraseña:</p>
          <a href="${resetLink}" style="background:#137fec;color:white;padding:12px 32px;
             border-radius:8px;text-decoration:none;display:inline-block;">
            Restablecer contraseña
          </a>
          <p style="color:#94a3b8;font-size:13px;margin-top:20px;">
            ⏱️ Expira en 1 hora. 🚫 Solo puede usarse una vez.
          </p>
        </div>
      `,
    });
  }
}
