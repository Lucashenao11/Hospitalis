import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsArray,
  IsObject,
  IsDateString,
  MaxLength,
} from 'class-validator';
import { RecordType, RecordStatus } from '../../../domain/enums/medical-record.enum';

export class CreateMedicalRecordDto {
  @IsMongoId()
  @IsNotEmpty()
  patientId!: string;

  @IsMongoId()
  @IsNotEmpty()
  doctorId!: string;

  @IsOptional()
  @IsMongoId()
  appointmentId?: string;

  @IsEnum(RecordType)
  @IsNotEmpty()
  type!: RecordType;

  @IsOptional()
  @IsEnum(RecordStatus)
  status?: RecordStatus;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(5000)
  description!: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  icdCode?: string;

  @IsOptional()
  @IsObject()
  vitals?: object;

  @IsOptional()
  @IsObject()
  labResult?: object;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  attachments?: string[];

  @IsOptional()
  @IsDateString()
  recordDate?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  notes?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
