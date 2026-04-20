import mongoose, { Document, Model } from 'mongoose';

export enum AppointmentStatus {
  SCHEDULED   = 'scheduled',
  CONFIRMED   = 'confirmed',
  IN_PROGRESS = 'in_progress',
  COMPLETED   = 'completed',
  CANCELLED   = 'cancelled',
  NO_SHOW     = 'no_show',
}

export enum AppointmentType {
  CHECKUP      = 'checkup',
  FOLLOW_UP    = 'follow_up',
  CONSULTATION = 'consultation',
  EMERGENCY    = 'emergency',
  PROCEDURE    = 'procedure',
  LAB          = 'lab',
}

export interface IAppointment {
  patientId: mongoose.Types.ObjectId;
  doctorId:  mongoose.Types.ObjectId;
  date:      Date;
  startTime: string;
  endTime:   string;
  type:      AppointmentType;
  status:    AppointmentStatus;
  reason:    string;
  notes:     string;
  room:      string;
}

export type AppointmentDocument = IAppointment & Document;

export interface CreateAppointmentDto {
  patientId: string;
  doctorId:  string;
  date:      string;
  startTime: string;
  endTime:   string;
  type?:     AppointmentType;
  status?:   AppointmentStatus;
  reason:    string;
  notes?:    string;
  room?:     string;
}

export type UpdateAppointmentDto = Partial<CreateAppointmentDto>;

const appointmentSchema = new mongoose.Schema<AppointmentDocument>(
  {
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctorId:  { type: mongoose.Schema.Types.ObjectId, ref: 'User',    required: true },
    date:      { type: Date,   required: true },
    startTime: { type: String, required: true },
    endTime:   { type: String, required: true },
    type:      { type: String, enum: Object.values(AppointmentType),   default: AppointmentType.CHECKUP },
    status:    { type: String, enum: Object.values(AppointmentStatus), default: AppointmentStatus.SCHEDULED },
    reason:    { type: String, required: true },
    notes:     { type: String, default: '' },
    room:      { type: String, default: '' },
  },
  { timestamps: true },
);

export const AppointmentModel: Model<AppointmentDocument> =
  mongoose.model<AppointmentDocument>('Appointment', appointmentSchema);