import { Document, Types } from 'mongoose';
import { AppointmentStatus, AppointmentType } from '../../../domain/enums/appointment.enum';
export type AppointmentDocument = AppointmentSchema & Document;
export declare class AppointmentSchema {
    patientId: Types.ObjectId;
    doctorId: Types.ObjectId;
    date: Date;
    startTime: string;
    endTime: string;
    type: AppointmentType;
    status: AppointmentStatus;
    reason: string;
    notes: string;
    room: string;
}
export declare const AppointmentMongooseSchema: import("mongoose").Schema<AppointmentSchema, import("mongoose").Model<AppointmentSchema, any, any, any, Document<unknown, any, AppointmentSchema, any, {}> & AppointmentSchema & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AppointmentSchema, Document<unknown, {}, import("mongoose").FlatRecord<AppointmentSchema>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<AppointmentSchema> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
