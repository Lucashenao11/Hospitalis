/**
 * CAPA DE DOMINIO — Interfaz IPatientRepository
 *
 * Contrato para persistir y recuperar pacientes.
 * La implementación concreta (MongoDB) vive en la capa de Infraestructura.
 */
import { PatientEntity } from '../entities/patient.entity';

export interface IPatientRepository {
  create(data: Partial<PatientEntity>): Promise<PatientEntity>;
  findAll(filters: {
    search?: string;
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<{ data: PatientEntity[]; total: number; page: number; limit: number }>;
  findById(id: string): Promise<PatientEntity | null>;
  findByEmail(email: string): Promise<PatientEntity | null>;
  update(id: string, data: Partial<PatientEntity>): Promise<PatientEntity | null>;
  remove(id: string): Promise<PatientEntity | null>;
}

export const PATIENT_REPOSITORY = 'PATIENT_REPOSITORY';
