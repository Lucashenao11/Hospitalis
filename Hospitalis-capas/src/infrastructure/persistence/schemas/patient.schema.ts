/**
 * CAPA DE INFRAESTRUCTURA — Schema de Mongoose para Patient
 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PatientStatus, BloodType } from '../../../domain/enums/patient-status.enum';

export type PatientDocument = PatientSchema & Document;

@Schema({ timestamps: true })
export class PatientSchema {
  @Prop({ required: true, trim: true })
  firstName!: string;

  @Prop({ required: true, trim: true })
  lastName!: string;

  @Prop({ required: true })
  dateOfBirth!: Date;

  @Prop({ required: true, enum: ['male', 'female', 'other'] })
  gender!: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email!: string;

  @Prop({ default: '' })
  phone!: string;

  @Prop({ default: '' })
  address!: string;

  @Prop({ default: '' })
  emergencyContactName!: string;

  @Prop({ default: '' })
  emergencyContactPhone!: string;

  @Prop({ type: String, enum: BloodType, default: null })
  bloodType!: string;

  @Prop({ type: [String], default: [] })
  allergies!: string[];

  @Prop({ type: [String], default: [] })
  chronicConditions!: string[];

  @Prop({ default: '' })
  notes!: string;

  @Prop({ type: String, enum: PatientStatus, default: PatientStatus.ACTIVE })
  status!: PatientStatus;
}

export const PatientMongooseSchema = SchemaFactory.createForClass(PatientSchema);
