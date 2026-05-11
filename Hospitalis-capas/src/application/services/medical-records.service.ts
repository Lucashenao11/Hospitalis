/**
 * CAPA DE APLICACIÓN — MedicalRecordsService
 *
 * Lógica de negocio para registros clínicos: creación, búsqueda por paciente,
 * actualización, eliminación y resumen clínico.
 */
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MedicalRecordSchema, MedicalRecordDocument } from '../../infrastructure/persistence/schemas/medical-record.schema';
import { CreateMedicalRecordDto } from '../../presentation/dto/medical-records/create-medical-record.dto';
import { UpdateMedicalRecordDto } from '../../presentation/dto/medical-records/update-medical-record.dto';
import { RecordType } from '../../domain/enums/medical-record.enum';

@Injectable()
export class MedicalRecordsService {
  constructor(
    @InjectModel(MedicalRecordSchema.name)
    private readonly recordModel: Model<MedicalRecordDocument>,
  ) {}

  async create(dto: CreateMedicalRecordDto) {
    const record = new this.recordModel({
      ...dto,
      patientId:     new Types.ObjectId(dto.patientId),
      doctorId:      new Types.ObjectId(dto.doctorId),
      appointmentId: dto.appointmentId ? new Types.ObjectId(dto.appointmentId) : null,
      recordDate:    dto.recordDate ? new Date(dto.recordDate) : new Date(),
    });
    return record.save();
  }

  async findByPatient(
    patientId: string,
    filters: {
      type?: RecordType;
      status?: string;
      from?: string;
      to?: string;
      page?: number;
      limit?: number;
    } = {},
  ) {
    if (!Types.ObjectId.isValid(patientId)) {
      throw new BadRequestException('ID de paciente inválido');
    }

    const { type, status, from, to, page = 1, limit = 20 } = filters;
    const query: any = { patientId: new Types.ObjectId(patientId) };
    if (type)   query.type   = type;
    if (status) query.status = status;
    if (from || to) {
      query.recordDate = {};
      if (from) query.recordDate.$gte = new Date(from);
      if (to)   query.recordDate.$lte = new Date(to);
    }

    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.recordModel
        .find(query)
        .sort({ recordDate: -1 })
        .skip(skip)
        .limit(limit)
        .populate('doctorId',      'fullname specialty email')
        .populate('patientId',     'firstName lastName email')
        .populate('appointmentId', 'date startTime type')
        .lean()
        .exec(),
      this.recordModel.countDocuments(query),
    ]);
    return { data, total, page, limit };
  }

  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('ID inválido');
    const record = await this.recordModel
      .findById(id)
      .populate('doctorId',      'fullname specialty email')
      .populate('patientId',     'firstName lastName email dateOfBirth')
      .populate('appointmentId', 'date startTime type reason')
      .exec();
    if (!record) throw new NotFoundException(`Registro médico ${id} no encontrado`);
    return record;
  }

  async update(id: string, dto: UpdateMedicalRecordDto) {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('ID inválido');
    const updated = await this.recordModel
      .findByIdAndUpdate(
        id,
        {
          ...dto,
          ...(dto.appointmentId && { appointmentId: new Types.ObjectId(dto.appointmentId) }),
          ...(dto.recordDate    && { recordDate: new Date(dto.recordDate) }),
        },
        { new: true, runValidators: true },
      )
      .populate('doctorId',  'fullname specialty')
      .populate('patientId', 'firstName lastName')
      .exec();
    if (!updated) throw new NotFoundException(`Registro médico ${id} no encontrado`);
    return updated;
  }

  async remove(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('ID inválido');
    const result = await this.recordModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException(`Registro médico ${id} no encontrado`);
    return { message: 'Registro médico eliminado exitosamente' };
  }

  async getSummary(patientId: string) {
    if (!Types.ObjectId.isValid(patientId)) throw new BadRequestException('ID de paciente inválido');
    const pid = new Types.ObjectId(patientId);

    const [byTypeAgg, latestRecord, activeConditions] = await Promise.all([
      this.recordModel.aggregate([
        { $match: { patientId: pid } },
        { $group: { _id: '$type', count: { $sum: 1 } } },
      ]),
      this.recordModel
        .findOne({ patientId: pid })
        .sort({ recordDate: -1 })
        .populate('doctorId', 'fullname specialty')
        .lean()
        .exec(),
      this.recordModel
        .find({ patientId: pid, type: RecordType.DIAGNOSIS, status: 'active' })
        .sort({ recordDate: -1 })
        .limit(10)
        .lean()
        .exec(),
    ]);

    const byType: Record<string, number> = {};
    let totalRecords = 0;
    for (const item of byTypeAgg) {
      byType[item._id] = item.count;
      totalRecords += item.count;
    }

    return { totalRecords, byType, latestRecord, activeConditions };
  }
}
