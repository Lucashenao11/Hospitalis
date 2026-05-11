/**
 * CAPA DE INFRAESTRUCTURA — Schema de Mongoose para MedicalRecord
 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { RecordType, RecordStatus } from '../../../domain/enums/medical-record.enum';

export type MedicalRecordDocument = MedicalRecordSchema & Document;

@Schema({ timestamps: true })
export class MedicalRecordSchema {
  @Prop({ type: Types.ObjectId, ref: 'PatientSchema', required: true })
  patientId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'UserSchema', required: true })
  doctorId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'AppointmentSchema', default: null })
  appointmentId!: Types.ObjectId | null;

  @Prop({ type: String, enum: RecordType, required: true })
  type!: RecordType;

  @Prop({ type: String, enum: RecordStatus, default: RecordStatus.ACTIVE })
  status!: RecordStatus;

  @Prop({ required: true, trim: true })
  title!: string;

  @Prop({ required: true, trim: true })
  description!: string;

  @Prop({ trim: true })
  icdCode!: string;

  @Prop({ type: Object, default: null })
  vitals!: object | null;

  @Prop({ type: Object, default: null })
  labResult!: object | null;

  @Prop({ type: [String], default: [] })
  attachments!: string[];

  @Prop({ default: Date.now })
  recordDate!: Date;

  @Prop({ trim: true })
  notes!: string;

  @Prop({ type: [String], default: [] })
  tags!: string[];
}

export const MedicalRecordMongooseSchema = SchemaFactory.createForClass(MedicalRecordSchema);

MedicalRecordMongooseSchema.index({ patientId: 1, recordDate: -1 });
MedicalRecordMongooseSchema.index({ patientId: 1, type: 1 });
MedicalRecordMongooseSchema.index({ doctorId: 1 });
