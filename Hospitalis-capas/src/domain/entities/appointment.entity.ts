/**
 * CAPA DE DOMINIO — Entidad Appointment
 *
 * Modela una cita médica en términos de negocio puro.
 */
import { AppointmentStatus, AppointmentType } from '../enums/appointment.enum';

export class AppointmentEntity {
  id?: string;
  patientId!: string;
  doctorId!: string;
  date!: Date;
  startTime!: string;
  endTime!: string;
  type: AppointmentType = AppointmentType.CHECKUP;
  status: AppointmentStatus = AppointmentStatus.SCHEDULED;
  reason!: string;
  notes: string = '';
  room: string = '';
  createdAt?: Date;
  updatedAt?: Date;
}
