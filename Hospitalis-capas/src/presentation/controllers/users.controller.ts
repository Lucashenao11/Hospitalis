/**
 * CAPA DE PRESENTACIÓN — UsersController
 *
 * Expone la gestión de usuarios. Combina JwtAuthGuard + RolesGuard
 * para controlar acceso por rol.
 */
import {
  Controller, Get, Patch, Delete, Body, Param,
  Query, UseGuards, Req, HttpCode, HttpStatus, ForbiddenException,
} from '@nestjs/common';
import { AuthGuard }    from '@nestjs/passport';
import { UsersService } from '../../application/services/users.service';
import { RolesGuard }   from '../../infrastructure/auth/guards/roles.guard';
import { Roles }        from '../../infrastructure/auth/decorators/roles.decorator';
import { Role }         from '../../domain/enums/roles.enum';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @Roles(Role.ADMIN, Role.MEDICO)
  getProfile(@Req() req: any) {
    return this.usersService.findOne(req.user.userId);
  }

  @Get()
  @Roles(Role.ADMIN, Role.MEDICO)
  findAll(
    @Query('role')     role?:     string,
    @Query('isActive') isActive?: string,
    @Query('page')     page?:     string,
    @Query('limit')    limit?:    string,
  ) {
    return this.usersService.findAll({
      role:     role || undefined,
      isActive: isActive !== undefined ? isActive === 'true' : undefined,
      page:     page  ? parseInt(page,  10) : 1,
      limit:    limit ? parseInt(limit, 10) : 10,
    });
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.MEDICO)
  findOne(@Req() req: any, @Param('id') id: string) {
    const isAdmin = req.user.role === Role.ADMIN;
    if (!isAdmin && req.user.userId !== id) {
      throw new ForbiddenException('No tienes permiso para ver este perfil');
    }
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.MEDICO)
  update(
    @Req() req: any,
    @Param('id') id: string,
    @Body() dto: {
      fullname?: string;
      email?: string;
      specialty?: string;
      role?: Role;
      isActive?: boolean;
      currentPassword?: string;
      password?: string;
    },
  ) {
    const isAdmin = req.user.role === Role.ADMIN;
    if (!isAdmin && req.user.userId !== id) {
      throw new ForbiddenException('No tienes permiso para editar este perfil');
    }
    if (!isAdmin) {
      delete dto.role;
      delete dto.isActive;
    }
    return this.usersService.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Delete(':id/hard')
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.OK)
  hardDelete(@Param('id') id: string) {
    return this.usersService.hardDelete(id);
  }
}
