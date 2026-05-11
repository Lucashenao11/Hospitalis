/**
 * CAPA DE DOMINIO — Entidad MedicalRecord
 *
 * Modela un registro clínico (diagnóstico, nota, resultado de lab, etc.)
 */
import { RecordType, RecordStatus } from '../enums/medical-record.enum';

export class MedicalRecordEntity {
  id?: string;
  patientId!: string;
  doctorId!: string;
  appointmentId?: string;
  type!: RecordType;
  status: RecordStatus = RecordStatus.ACTIVE;
  title!: string;
  description!: string;
  icdCode?: string;
  vitals?: {
    heartRate?: number;
    bloodPressure?: string;
    temperature?: number;
    weight?: number;
    height?: number;
    oxygenSaturation?: number;
    respiratoryRate?: number;
  };
  labResult?: {
    testName?: string;
    result?: string;
    unit?: string;
    referenceRange?: string;
    isAbnormal?: boolean;
  };
  attachments: string[] = [];
  recordDate: Date = new Date();
  notes: string = '';
  tags: string[] = [];
  createdAt?: Date;
  updatedAt?: Date;
}
