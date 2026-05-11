/**
 * CAPA DE INFRAESTRUCTURA — Guard de Roles (RBAC)
 *
 * Verifica que el usuario autenticado tenga el rol requerido
 * por el decorador @Roles() en el controller/endpoint.
 *
 * Flujo: JwtAuthGuard valida el token → RolesGuard verifica el rol.
 */
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../../../domain/enums/roles.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    const hasRole = requiredRoles.some((role) => user?.role === role);

    if (!hasRole) {
      throw new ForbiddenException(
        `Acceso denegado. Roles requeridos: ${requiredRoles.join(', ')}`,
      );
    }

    return true;
  }
}
