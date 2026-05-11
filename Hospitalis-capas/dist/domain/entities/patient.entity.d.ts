import { PatientStatus, BloodType } from '../enums/patient-status.enum';
export declare class PatientEntity {
    id?: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    gender: 'male' | 'female' | 'other';
    email: string;
    phone: string;
    address: string;
    emergencyContactName: string;
    emergencyContactPhone: string;
    bloodType?: BloodType;
    allergies: string[];
    chronicConditions: string[];
    notes: string;
    status: PatientStatus;
    createdAt?: Date;
    updatedAt?: Date;
}
