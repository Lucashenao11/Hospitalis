/**
 * CAPA DE INFRAESTRUCTURA — Schema de Mongoose para User
 *
 * Aquí es donde ocurre el "mapeo" entre la entidad de dominio (UserEntity)
 * y la colección de MongoDB. Los decoradores de Mongoose (@Prop, @Schema)
 * son detalles de infraestructura: no pertenecen al dominio.
 *
 * Separar schema de entidad permite:
 * - Cambiar la BD (de MongoDB a PostgreSQL, por ejemplo) sin tocar el dominio
 * - Testear la lógica de negocio sin levantar MongoDB
 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../../../domain/enums/roles.enum';

export type UserDocument = UserSchema & Document;

@Schema({ timestamps: true })
export class UserSchema {
  @Prop({ required: true })
  fullname!: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ default: '' })
  specialty!: string;

  @Prop({ type: String, enum: Role, default: Role.MEDICO })
  role!: Role;

  @Prop({ default: true })
  isActive!: boolean;
}

export const UserMongooseSchema = SchemaFactory.createForClass(UserSchema);
