/**
 * CAPA DE DOMINIO — Entidad User
 *
 * Una entidad representa un concepto de negocio con identidad propia.
 * Esta clase NO usa decoradores de Mongoose ni de NestJS:
 * es TypeScript puro y puede usarse en tests sin levantar la app.
 *
 * La infraestructura (Capa de Infraestructura) se encarga de
 * persistirla en MongoDB mediante un Schema separado.
 */
import { Role } from '../enums/roles.enum';

export class UserEntity {
  id?: string;
  fullname!: string;
  email!: string;
  password!: string;
  specialty: string = '';
  role: Role = Role.MEDICO;
  isActive: boolean = true;
  createdAt?: Date;
  updatedAt?: Date;
}
