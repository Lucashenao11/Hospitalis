import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { LoginDto } from '../../presentation/dto/auth/login.dto';
import { RegisterDto } from '../../presentation/dto/auth/register.dto';
import { PasswordResetTokenDocument } from '../../infrastructure/persistence/schemas/password-reset.schema';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    private readonly configService;
    private readonly resetTokenModel;
    constructor(usersService: UsersService, jwtService: JwtService, configService: ConfigService, resetTokenModel: Model<PasswordResetTokenDocument>);
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
    }>;
    register(registerDto: RegisterDto): Promise<{
        message: string;
        userId: import("mongoose").Types.ObjectId;
    }>;
    forgotPassword(email: string): Promise<{
        message: string;
    }>;
    resetPassword(token: string, newPassword: string): Promise<{
        message: string;
    }>;
    private sendResetEmail;
}
