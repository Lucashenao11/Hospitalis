import { RecordType, RecordStatus } from '../enums/medical-record.enum';
export declare class MedicalRecordEntity {
    id?: string;
    patientId: string;
    doctorId: string;
    appointmentId?: string;
    type: RecordType;
    status: RecordStatus;
    title: string;
    description: string;
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
    attachments: string[];
    recordDate: Date;
    notes: string;
    tags: string[];
    createdAt?: Date;
    updatedAt?: Date;
}
