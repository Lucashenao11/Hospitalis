import { Document, Types } from 'mongoose';
import { RecordType, RecordStatus } from '../../../domain/enums/medical-record.enum';
export type MedicalRecordDocument = MedicalRecordSchema & Document;
export declare class MedicalRecordSchema {
    patientId: Types.ObjectId;
    doctorId: Types.ObjectId;
    appointmentId: Types.ObjectId | null;
    type: RecordType;
    status: RecordStatus;
    title: string;
    description: string;
    icdCode: string;
    vitals: object | null;
    labResult: object | null;
    attachments: string[];
    recordDate: Date;
    notes: string;
    tags: string[];
}
export declare const MedicalRecordMongooseSchema: import("mongoose").Schema<MedicalRecordSchema, import("mongoose").Model<MedicalRecordSchema, any, any, any, Document<unknown, any, MedicalRecordSchema, any, {}> & MedicalRecordSchema & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, MedicalRecordSchema, Document<unknown, {}, import("mongoose").FlatRecord<MedicalRecordSchema>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<MedicalRecordSchema> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
