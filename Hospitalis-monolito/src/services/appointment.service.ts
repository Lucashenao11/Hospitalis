import { appointmentRepository, FindAllQuery, PaginatedResult } from '../repositories/appointment.repository';
import { AppointmentDocument, CreateAppointmentDto, UpdateAppointmentDto } from '../models/appointment.model';

class AppError extends Error {
  constructor(public message: string, public statusCode: number) {
    super(message);
  }
}

async function create(data: CreateAppointmentDto): Promise<AppointmentDocument> {
  return appointmentRepository.create(data);
}

async function findAll(query: FindAllQuery): Promise<PaginatedResult> {
  return appointmentRepository.findAll(query);
}

async function findOne(id: string): Promise<AppointmentDocument> {
  const appointment = await appointmentRepository.findById(id);
  if (!appointment) throw new AppError('Cita no encontrada', 404);
  return appointment;
}

async function update(id: string, data: UpdateAppointmentDto): Promise<AppointmentDocument> {
  const appointment = await appointmentRepository.update(id, data);
  if (!appointment) throw new AppError('Cita no encontrada', 404);
  return appointment;
}

async function remove(id: string): Promise<{ message: string }> {
  const appointment = await appointmentRepository.delete(id);
  if (!appointment) throw new AppError('Cita no encontrada', 404);
  return { message: 'Cita eliminada exitosamente' };
}

async function findToday(): Promise<AppointmentDocument[]> {
  return appointmentRepository.findToday();
}

export const appointmentService = { create, findAll, findOne, update, remove, findToday };
export { AppError };