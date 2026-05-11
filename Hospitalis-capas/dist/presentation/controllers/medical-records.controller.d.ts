import { MedicalRecordsService } from '../../application/services/medical-records.service';
import { CreateMedicalRecordDto } from '../dto/medical-records/create-medical-record.dto';
import { UpdateMedicalRecordDto } from '../dto/medical-records/update-medical-record.dto';
export declare class MedicalRecordsController {
    private readonly medicalRecordsService;
    constructor(medicalRecordsService: MedicalRecordsService);
    create(dto: CreateMedicalRecordDto): Promise<import("mongoose").Document<unknown, {}, import("../../infrastructure/persistence/schemas/medical-record.schema").MedicalRecordDocument, {}, {}> & import("../../infrastructure/persistence/schemas/medical-record.schema").MedicalRecordSchema & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findByPatient(patientId: string, type?: string, status?: string, from?: string, to?: string, page?: string, limit?: string): Promise<{
        data: (import("mongoose").FlattenMaps<import("../../infrastructure/persistence/schemas/medical-record.schema").MedicalRecordDocument> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    getSummary(patientId: string): Promise<{
        totalRecords: number;
        byType: Record<string, number>;
        latestRecord: import("mongoose").FlattenMaps<import("../../infrastructure/persistence/schemas/medical-record.schema").MedicalRecordDocument> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        };
        activeConditions: (import("mongoose").FlattenMaps<import("../../infrastructure/persistence/schemas/medical-record.schema").MedicalRecordDocument> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
    }>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("../../infrastructure/persistence/schemas/medical-record.schema").MedicalRecordDocument, {}, {}> & import("../../infrastructure/persistence/schemas/medical-record.schema").MedicalRecordSchema & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(id: string, dto: UpdateMedicalRecordDto): Promise<import("mongoose").Document<unknown, {}, import("../../infrastructure/persistence/schemas/medical-record.schema").MedicalRecordDocument, {}, {}> & import("../../infrastructure/persistence/schemas/medical-record.schema").MedicalRecordSchema & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
