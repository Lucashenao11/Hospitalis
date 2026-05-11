import { PatientsService } from '../../application/services/patients.service';
import { CreatePatientDto } from '../dto/patients/create-patient.dto';
import { UpdatePatientDto } from '../dto/patients/update-patient.dto';
export declare class PatientsController {
    private readonly patientsService;
    constructor(patientsService: PatientsService);
    create(dto: CreatePatientDto): Promise<import("mongoose").Document<unknown, {}, import("../../infrastructure/persistence/schemas/patient.schema").PatientDocument, {}, {}> & import("../../infrastructure/persistence/schemas/patient.schema").PatientSchema & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findAll(search?: string, status?: string, page?: string, limit?: string): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("../../infrastructure/persistence/schemas/patient.schema").PatientDocument, {}, {}> & import("../../infrastructure/persistence/schemas/patient.schema").PatientSchema & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("../../infrastructure/persistence/schemas/patient.schema").PatientDocument, {}, {}> & import("../../infrastructure/persistence/schemas/patient.schema").PatientSchema & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(id: string, dto: UpdatePatientDto): Promise<import("mongoose").Document<unknown, {}, import("../../infrastructure/persistence/schemas/patient.schema").PatientDocument, {}, {}> & import("../../infrastructure/persistence/schemas/patient.schema").PatientSchema & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
