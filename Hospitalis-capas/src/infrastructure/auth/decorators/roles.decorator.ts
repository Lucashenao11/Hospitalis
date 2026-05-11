/**
 * CAPA DE INFRAESTRUCTURA — Decorador @Roles()
 *
 * Permite marcar un endpoint con los roles que pueden acceder.
 * Uso: @Roles(Role.ADMIN) o @Roles(Role.ADMIN, Role.MEDICO)
 *
 * NestJS lee esta metadata en el RolesGuard mediante Reflector.
 */
import { SetMetadata } from '@nestjs/common';
import { Role } from '../../../domain/enums/roles.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
