import { Document } from 'mongoose';
import { PatientStatus } from '../../../domain/enums/patient-status.enum';
export type PatientDocument = PatientSchema & Document;
export declare class PatientSchema {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    gender: string;
    email: string;
    phone: string;
    address: string;
    emergencyContactName: string;
    emergencyContactPhone: string;
    bloodType: string;
    allergies: string[];
    chronicConditions: string[];
    notes: string;
    status: PatientStatus;
}
export declare const PatientMongooseSchema: import("mongoose").Schema<PatientSchema, import("mongoose").Model<PatientSchema, any, any, any, Document<unknown, any, PatientSchema, any, {}> & PatientSchema & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PatientSchema, Document<unknown, {}, import("mongoose").FlatRecord<PatientSchema>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<PatientSchema> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
