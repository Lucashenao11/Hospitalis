import { PatientStatus, BloodType } from '../../../domain/enums/patient-status.enum';
export declare class CreatePatientDto {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    email: string;
    phone?: string;
    address?: string;
    emergencyContactName?: string;
    emergencyContactPhone?: string;
    bloodType?: BloodType;
    allergies?: string[];
    chronicConditions?: string[];
    notes?: string;
    status?: PatientStatus;
}
