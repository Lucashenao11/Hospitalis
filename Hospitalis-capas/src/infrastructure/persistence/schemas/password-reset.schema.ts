/**
 * CAPA DE INFRAESTRUCTURA — Schema de Mongoose para PasswordResetToken
 *
 * Almacena tokens temporales de recuperación de contraseña.
 * Se invalidan tras su uso o expiración.
 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PasswordResetTokenDocument = PasswordResetTokenSchema & Document;

@Schema({ timestamps: true })
export class PasswordResetTokenSchema {
  @Prop({ required: true, unique: true })
  token!: string;

  @Prop({ type: Types.ObjectId, ref: 'UserSchema', required: true })
  userId!: Types.ObjectId;

  @Prop({ required: true })
  expiresAt!: Date;

  @Prop({ default: false })
  used!: boolean;
}

export const PasswordResetTokenMongooseSchema =
  SchemaFactory.createForClass(PasswordResetTokenSchema);
