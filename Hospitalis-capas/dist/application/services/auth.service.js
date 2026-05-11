"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("./users.service");
const password_reset_schema_1 = require("../../infrastructure/persistence/schemas/password-reset.schema");
let AuthService = class AuthService {
    constructor(usersService, jwtService, configService, resetTokenModel) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.configService = configService;
        this.resetTokenModel = resetTokenModel;
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        const user = await this.usersService.findByEmail(email);
        if (!user)
            throw new common_1.BadRequestException('Credenciales inválidas');
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
            throw new common_1.BadRequestException('Credenciales inválidas');
        const payload = {
            sub: user['_id'],
            email: user.email,
            role: user.role,
            fullName: user.fullname,
        };
        return { accessToken: this.jwtService.sign(payload) };
    }
    async register(registerDto) {
        const { fullName, email, password } = registerDto;
        const existing = await this.usersService.findByEmail(email);
        if (existing)
            throw new common_1.BadRequestException('Credenciales inválidas');
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.usersService.create({
            fullname: fullName,
            email,
            password: hashedPassword,
        });
        return { message: 'Usuario registrado exitosamente', userId: user['_id'] };
    }
    async forgotPassword(email) {
        const GENERIC = {
            message: 'Si el correo está registrado, recibirás un enlace de recuperación.',
        };
        const user = await this.usersService.findByEmail(email);
        if (!user)
            return GENERIC;
        await this.resetTokenModel.updateMany({ userId: user['_id'], used: false }, { $set: { used: true } });
        const token = crypto.randomUUID();
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
        await this.resetTokenModel.create({ token, userId: user['_id'], expiresAt, used: false });
        const frontendUrl = this.configService.get('FRONTEND_URL');
        const resetLink = `${frontendUrl}/reset-password?token=${token}`;
        await this.sendResetEmail(email, user['fullname'], resetLink);
        return GENERIC;
    }
    async resetPassword(token, newPassword) {
        const resetToken = await this.resetTokenModel.findOne({ token });
        if (!resetToken)
            throw new common_1.BadRequestException('Token inválido o inexistente');
        if (resetToken.used)
            throw new common_1.BadRequestException('Este enlace ya fue utilizado');
        if (resetToken.expiresAt < new Date()) {
            throw new common_1.BadRequestException('El enlace ha expirado. Solicita uno nuevo');
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await this.usersService.updatePassword(String(resetToken.userId), hashedPassword);
        await this.resetTokenModel.findByIdAndUpdate(resetToken._id, { $set: { used: true } });
        return { message: 'Contraseña actualizada exitosamente' };
    }
    async sendResetEmail(to, name, resetLink) {
        const transporter = nodemailer.createTransport({
            host: this.configService.get('MAILTRAP_HOST'),
            port: this.configService.get('MAILTRAP_PORT'),
            auth: {
                user: this.configService.get('MAILTRAP_USER'),
                pass: this.configService.get('MAILTRAP_PASS'),
            },
        });
        await transporter.sendMail({
            from: `"Hospitalis" <${this.configService.get('MAIL_FROM')}>`,
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
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, mongoose_1.InjectModel)(password_reset_schema_1.PasswordResetTokenSchema.name)),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        config_1.ConfigService,
        mongoose_2.Model])
], AuthService);
//# sourceMappingURL=auth.service.js.map