import { AppointmentsService } from '../../application/services/appointments.service';
import { CreateAppointmentDto } from '../dto/appointments/create-appointment.dto';
import { UpdateAppointmentDto } from '../dto/appointments/update-appointment.dto';
export declare class AppointmentsController {
    private readonly appointmentsService;
    constructor(appointmentsService: AppointmentsService);
    create(dto: CreateAppointmentDto): Promise<import("mongoose").Document<unknown, {}, import("../../infrastructure/persistence/schemas/appointment.schema").AppointmentDocument, {}, {}> & import("../../infrastructure/persistence/schemas/appointment.schema").AppointmentSchema & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findAll(doctorId?: string, patientId?: string, status?: string, date?: string, page?: string, limit?: string): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("../../infrastructure/persistence/schemas/appointment.schema").AppointmentDocument, {}, {}> & import("../../infrastructure/persistence/schemas/appointment.schema").AppointmentSchema & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    findToday(req: any): Promise<(import("mongoose").Document<unknown, {}, import("../../infrastructure/persistence/schemas/appointment.schema").AppointmentDocument, {}, {}> & import("../../infrastructure/persistence/schemas/appointment.schema").AppointmentSchema & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("../../infrastructure/persistence/schemas/appointment.schema").AppointmentDocument, {}, {}> & import("../../infrastructure/persistence/schemas/appointment.schema").AppointmentSchema & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(id: string, dto: UpdateAppointmentDto): Promise<import("mongoose").Document<unknown, {}, import("../../infrastructure/persistence/schemas/appointment.schema").AppointmentDocument, {}, {}> & import("../../infrastructure/persistence/schemas/appointment.schema").AppointmentSchema & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
