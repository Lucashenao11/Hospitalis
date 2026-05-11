import { RecordType, RecordStatus } from '../../../domain/enums/medical-record.enum';
export declare class CreateMedicalRecordDto {
    patientId: string;
    doctorId: string;
    appointmentId?: string;
    type: RecordType;
    status?: RecordStatus;
    title: string;
    description: string;
    icdCode?: string;
    vitals?: object;
    labResult?: object;
    attachments?: string[];
    recordDate?: string;
    notes?: string;
    tags?: string[];
}
