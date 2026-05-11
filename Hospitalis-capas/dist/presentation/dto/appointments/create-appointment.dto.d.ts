import { AppointmentStatus, AppointmentType } from '../../../domain/enums/appointment.enum';
export declare class CreateAppointmentDto {
    patientId: string;
    doctorId: string;
    date: string;
    startTime: string;
    endTime: string;
    type?: AppointmentType;
    status?: AppointmentStatus;
    reason: string;
    notes?: string;
    room?: string;
}
