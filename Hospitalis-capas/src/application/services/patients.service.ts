/**
 * CAPA DE APLICACIÓN — PatientsService
 *
 * Lógica de negocio para gestión de pacientes.
 */
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PatientSchema, PatientDocument } from '../../infrastructure/persistence/schemas/patient.schema';
import { CreatePatientDto } from '../../presentation/dto/patients/create-patient.dto';
import { UpdatePatientDto }  from '../../presentation/dto/patients/update-patient.dto';

@Injectable()
export class PatientsService {
  constructor(
    @InjectModel(PatientSchema.name)
    private patientModel: Model<PatientDocument>,
  ) {}

  async create(dto: CreatePatientDto) {
    const existing = await this.patientModel.findOne({ email: dto.email });
    if (existing) throw new ConflictException('Ya existe un paciente con este correo');
    const patient = new this.patientModel(dto);
    return patient.save();
  }

  async findAll(query?: {
    search?: string;
    status?: string;
    page?: number;
    limit?: number;
  }) {
    const page  = query?.page  ?? 1;
    const limit = query?.limit ?? 10;
    const skip  = (page - 1) * limit;
    const filter: any = {};

    if (query?.status) filter.status = query.status;
    if (query?.search) {
      const regex = new RegExp(query.search, 'i');
      filter.$or = [
        { firstName: regex },
        { lastName:  regex },
        { email:     regex },
        { phone:     regex },
      ];
    }

    const [data, total] = await Promise.all([
      this.patientModel.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 }),
      this.patientModel.countDocuments(filter),
    ]);
    return { data, total, page, limit };
  }

  async findOne(id: string) {
    const patient = await this.patientModel.findById(id);
    if (!patient) throw new NotFoundException('Paciente no encontrado');
    return patient;
  }

  async update(id: string, dto: UpdatePatientDto) {
    const patient = await this.patientModel.findByIdAndUpdate(
      id, { $set: dto }, { new: true, runValidators: true },
    );
    if (!patient) throw new NotFoundException('Paciente no encontrado');
    return patient;
  }

  async remove(id: string) {
    const patient = await this.patientModel.findByIdAndDelete(id);
    if (!patient) throw new NotFoundException('Paciente no encontrado');
    return { message: 'Paciente eliminado exitosamente' };
  }
}
