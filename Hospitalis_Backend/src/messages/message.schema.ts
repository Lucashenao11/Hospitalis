import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// La anterior linea importa utilidades del paquete @nestjs/mongoose, que es la integración oficial entre NestJS y Mongoose.

// NestJS: framework backend para NodeJS, muy basado en TypeScript, modular, con inyección de dependencias y decoradores (muy
// estilo angular).
// Mongoose: librería ODM (Object Data Modeling) para trabajar con MongoDB usando "modelos" y "schemas"

// Cada import:
// @Schema() es un decorador que marca una clase de TypeScript como "ésta clase representa un Schema de Mongoose" permite
// definir el schema usando clases y decoradores en lugar de escribir el objeto de schema "a mano"
// @Prop() decorador para declarar una propiedad de la clase como un campo del schema y configurar sus opciones (required, default,
// trim, type, ref, etc.)
// ShemaFactory es un helper que convierte la clase decorada (Message) en un schema real de Mongoose:
// SchemaFactory.createForClass(Message)
// Prop/Schema/SchemaFactory: decoradores y utilidades para definir schemas de MongoDB (Mongoose) usando clases en NestJS.

import { Document, Types } from 'mongoose';

// Document: tipo de Mongoose que representa un documento real guardado en MongoDB (con _id, métodos, etc.)
// Types.ObjectId: tipo para IDs/relaciones en MongoDB

import { User } from '../users/user.schema';

// importa el schema/clase de User, para poder referenciar usuarios en este schema (sender/receiver)
// Importamos User para referenciarlo (relación) desde Message mediante ObjectId + ref.

export type MessageDocument = Message & Document;

// MessageDocument combina la clase Message (propiedades tipadas) + Document (funcionalidades de Mongoose como _id y métodos).

@Schema({ timestamps: true })
export class Message {

// @Schema(...) le dice a Nest/Mongoose: “esta clase define un schema”.
// timestamps: true indica que Mongoose agregará y mantendrá automáticamente createdAt y updatedAt

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  sender!: Types.ObjectId;

  // sender: referencia (ObjectId) al usuario que envía el mensaje. required => no existe mensaje sin remitente.
  // el '!' indica que la expresión no puede ser nulificada, siempre estará definido en runtime

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  receiver!: Types.ObjectId;

  // receiver: referencia (ObjectId) al usuario destinatario. Se puede usar populate para traer sus datos.

  @Prop({ required: true, trim: true })
  content!: string;

  // content: texto del mensaje. trim elimina espacios sobrantes al inicio/fin; required obliga a tener contenido.

  @Prop({ default: false })
  isRead!: boolean;

  // isRead: flag de lectura. default=false => todo mensaje nuevo inicia como no leído.

  createdAt?: Date;
  updatedAt?: Date;
}

// createdAt/updatedAt vienen de timestamps:true (Mongoose). Se declaran para tipado/autocompletado.

export const MessageSchema = SchemaFactory.createForClass(Message);

// Convierte la clase decorada Message en un Schema de Mongoose para registrarlo en el módulo.