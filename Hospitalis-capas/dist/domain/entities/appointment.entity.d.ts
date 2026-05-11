import { AppointmentStatus, AppointmentType } from '../enums/appointment.enum';
export declare class AppointmentEntity {
    id?: string;
    patientId: string;
    doctorId: string;
    date: Date;
    startTime: string;
    endTime: string;
    type: AppointmentType;
    status: AppointmentStatus;
    reason: string;
    notes: string;
    room: string;
    createdAt?: Date;
    updatedAt?: Date;
}
