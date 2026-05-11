import { Model, Types } from 'mongoose';
import { MedicalRecordSchema, MedicalRecordDocument } from '../../infrastructure/persistence/schemas/medical-record.schema';
import { CreateMedicalRecordDto } from '../../presentation/dto/medical-records/create-medical-record.dto';
import { UpdateMedicalRecordDto } from '../../presentation/dto/medical-records/update-medical-record.dto';
import { RecordType } from '../../domain/enums/medical-record.enum';
export declare class MedicalRecordsService {
    private readonly recordModel;
    constructor(recordModel: Model<MedicalRecordDocument>);
    create(dto: CreateMedicalRecordDto): Promise<import("mongoose").Document<unknown, {}, MedicalRecordDocument, {}, {}> & MedicalRecordSchema & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findByPatient(patientId: string, filters?: {
        type?: RecordType;
        status?: string;
        from?: string;
        to?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        data: (import("mongoose").FlattenMaps<MedicalRecordDocument> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, MedicalRecordDocument, {}, {}> & MedicalRecordSchema & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(id: string, dto: UpdateMedicalRecordDto): Promise<import("mongoose").Document<unknown, {}, MedicalRecordDocument, {}, {}> & MedicalRecordSchema & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    getSummary(patientId: string): Promise<{
        totalRecords: number;
        byType: Record<string, number>;
        latestRecord: import("mongoose").FlattenMaps<MedicalRecordDocument> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        };
        activeConditions: (import("mongoose").FlattenMaps<MedicalRecordDocument> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        })[];
    }>;
}
