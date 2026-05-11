import { Model } from 'mongoose';
import { PatientSchema, PatientDocument } from '../../infrastructure/persistence/schemas/patient.schema';
import { CreatePatientDto } from '../../presentation/dto/patients/create-patient.dto';
import { UpdatePatientDto } from '../../presentation/dto/patients/update-patient.dto';
export declare class PatientsService {
    private patientModel;
    constructor(patientModel: Model<PatientDocument>);
    create(dto: CreatePatientDto): Promise<import("mongoose").Document<unknown, {}, PatientDocument, {}, {}> & PatientSchema & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findAll(query?: {
        search?: string;
        status?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        data: (import("mongoose").Document<unknown, {}, PatientDocument, {}, {}> & PatientSchema & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, PatientDocument, {}, {}> & PatientSchema & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(id: string, dto: UpdatePatientDto): Promise<import("mongoose").Document<unknown, {}, PatientDocument, {}, {}> & PatientSchema & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
