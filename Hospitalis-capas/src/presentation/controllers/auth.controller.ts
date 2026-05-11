/**
 * CAPA DE PRESENTACIÓN — AuthController
 *
 * El controller es el punto de entrada HTTP. Su única responsabilidad
 * es recibir la petición, delegar al servicio de aplicación y devolver la respuesta.
 * NO contiene lógica de negocio — eso es trabajo de la capa de Aplicación.
 */
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../../application/services/auth.service';
import { LoginDto }    from '../dto/auth/login.dto';
import { RegisterDto } from '../dto/auth/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('forgot-password')
  forgotPassword(@Body('email') email: string) {
    return this.authService.forgotPassword(email);
  }

  @Post('reset-password')
  resetPassword(
    @Body('token')       token:       string,
    @Body('newPassword') newPassword: string,
  ) {
    return this.authService.resetPassword(token, newPassword);
  }
}
