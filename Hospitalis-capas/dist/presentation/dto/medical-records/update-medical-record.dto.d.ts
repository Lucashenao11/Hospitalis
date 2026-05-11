import { CreateMedicalRecordDto } from './create-medical-record.dto';
declare const UpdateMedicalRecordDto_base: import("@nestjs/mapped-types").MappedType<Partial<Omit<CreateMedicalRecordDto, "patientId" | "doctorId">>>;
export declare class UpdateMedicalRecordDto extends UpdateMedicalRecordDto_base {
}
export {};
