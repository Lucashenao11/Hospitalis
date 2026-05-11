/**
 * CAPA DE DOMINIO — Entidad Patient
 *
 * Define qué es un paciente en términos del negocio.
 * No sabe nada de bases de datos, HTTP ni frameworks.
 */
import { PatientStatus, BloodType } from '../enums/patient-status.enum';

export class PatientEntity {
  id?: string;
  firstName!: string;
  lastName!: string;
  dateOfBirth!: Date;
  gender!: 'male' | 'female' | 'other';
  email!: string;
  phone: string = '';
  address: string = '';
  emergencyContactName: string = '';
  emergencyContactPhone: string = '';
  bloodType?: BloodType;
  allergies: string[] = [];
  chronicConditions: string[] = [];
  notes: string = '';
  status: PatientStatus = PatientStatus.ACTIVE;
  createdAt?: Date;
  updatedAt?: Date;
}
