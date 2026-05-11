/**
 * CAPA DE INFRAESTRUCTURA — Guard JWT
 *
 * Un guard en NestJS decide si una petición puede continuar o no.
 * Este guard verifica que el token JWT en el header Authorization sea válido.
 * Es infraestructura porque depende de Passport (librería externa).
 */
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
