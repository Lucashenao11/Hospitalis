import { Model } from 'mongoose';
import { AppointmentSchema, AppointmentDocument } from '../../infrastructure/persistence/schemas/appointment.schema';
import { CreateAppointmentDto } from '../../presentation/dto/appointments/create-appointment.dto';
import { UpdateAppointmentDto } from '../../presentation/dto/appointments/update-appointment.dto';
export declare class AppointmentsService {
    private appointmentModel;
    constructor(appointmentModel: Model<AppointmentDocument>);
    create(dto: CreateAppointmentDto): Promise<import("mongoose").Document<unknown, {}, AppointmentDocument, {}, {}> & AppointmentSchema & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findAll(query?: {
        doctorId?: string;
        patientId?: string;
        status?: string;
        date?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        data: (import("mongoose").Document<unknown, {}, AppointmentDocument, {}, {}> & AppointmentSchema & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, AppointmentDocument, {}, {}> & AppointmentSchema & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(id: string, dto: UpdateAppointmentDto): Promise<import("mongoose").Document<unknown, {}, AppointmentDocument, {}, {}> & AppointmentSchema & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    findTodayByDoctor(_doctorId: string): Promise<(import("mongoose").Document<unknown, {}, AppointmentDocument, {}, {}> & AppointmentSchema & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
}
