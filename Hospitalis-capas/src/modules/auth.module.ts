/**
 * MÓDULO AuthModule
 *
 * En arquitectura por capas, los módulos de NestJS actúan como
 * "ensambladores": conectan los componentes de cada capa.
 *
 * Este módulo registra:
 * - Presentación: AuthController
 * - Aplicación:   AuthService
 * - Infraestructura: JwtStrategy, schema PasswordResetToken
 */
import { Module } from '@nestjs/common';
import { JwtModule }      from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthController } from '../presentation/controllers/auth.controller';
import { AuthService }    from '../application/services/auth.service';
import { JwtStrategy }    from '../infrastructure/auth/strategies/jwt.strategy';
import {
  PasswordResetTokenSchema,
  PasswordResetTokenMongooseSchema,
} from '../infrastructure/persistence/schemas/password-reset.schema';
import { UsersModule } from './users.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: PasswordResetTokenSchema.name, schema: PasswordResetTokenMongooseSchema },
    ]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: config.get<string>('JWT_EXPIRES_IN') ?? '1h',
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers:   [AuthService, JwtStrategy],
})
export class AuthModule {}
