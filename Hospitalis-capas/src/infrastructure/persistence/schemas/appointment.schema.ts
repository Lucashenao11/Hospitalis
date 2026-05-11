/**
 * CAPA DE INFRAESTRUCTURA — Schema de Mongoose para Appointment
 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { AppointmentStatus, AppointmentType } from '../../../domain/enums/appointment.enum';

export type AppointmentDocument = AppointmentSchema & Document;

@Schema({ timestamps: true })
export class AppointmentSchema {
  @Prop({ type: Types.ObjectId, ref: 'PatientSchema', required: true })
  patientId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'UserSchema', required: true })
  doctorId!: Types.ObjectId;

  @Prop({ required: true })
  date!: Date;

  @Prop({ required: true })
  startTime!: string;

  @Prop({ required: true })
  endTime!: string;

  @Prop({ type: String, enum: AppointmentType, default: AppointmentType.CHECKUP })
  type!: AppointmentType;

  @Prop({ type: String, enum: AppointmentStatus, default: AppointmentStatus.SCHEDULED })
  status!: AppointmentStatus;

  @Prop({ required: true })
  reason!: string;

  @Prop({ default: '' })
  notes!: string;

  @Prop({ default: '' })
  room!: string;
}

export const AppointmentMongooseSchema = SchemaFactory.createForClass(AppointmentSchema);
