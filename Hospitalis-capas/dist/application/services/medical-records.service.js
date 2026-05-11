"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicalRecordsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const medical_record_schema_1 = require("../../infrastructure/persistence/schemas/medical-record.schema");
const medical_record_enum_1 = require("../../domain/enums/medical-record.enum");
let MedicalRecordsService = class MedicalRecordsService {
    constructor(recordModel) {
        this.recordModel = recordModel;
    }
    async create(dto) {
        const record = new this.recordModel({
            ...dto,
            patientId: new mongoose_2.Types.ObjectId(dto.patientId),
            doctorId: new mongoose_2.Types.ObjectId(dto.doctorId),
            appointmentId: dto.appointmentId ? new mongoose_2.Types.ObjectId(dto.appointmentId) : null,
            recordDate: dto.recordDate ? new Date(dto.recordDate) : new Date(),
        });
        return record.save();
    }
    async findByPatient(patientId, filters = {}) {
        if (!mongoose_2.Types.ObjectId.isValid(patientId)) {
            throw new common_1.BadRequestException('ID de paciente inválido');
        }
        const { type, status, from, to, page = 1, limit = 20 } = filters;
        const query = { patientId: new mongoose_2.Types.ObjectId(patientId) };
        if (type)
            query.type = type;
        if (status)
            query.status = status;
        if (from || to) {
            query.recordDate = {};
            if (from)
                query.recordDate.$gte = new Date(from);
            if (to)
                query.recordDate.$lte = new Date(to);
        }
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.recordModel
                .find(query)
                .sort({ recordDate: -1 })
                .skip(skip)
                .limit(limit)
                .populate('doctorId', 'fullname specialty email')
                .populate('patientId', 'firstName lastName email')
                .populate('appointmentId', 'date startTime type')
                .lean()
                .exec(),
            this.recordModel.countDocuments(query),
        ]);
        return { data, total, page, limit };
    }
    async findOne(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id))
            throw new common_1.BadRequestException('ID inválido');
        const record = await this.recordModel
            .findById(id)
            .populate('doctorId', 'fullname specialty email')
            .populate('patientId', 'firstName lastName email dateOfBirth')
            .populate('appointmentId', 'date startTime type reason')
            .exec();
        if (!record)
            throw new common_1.NotFoundException(`Registro médico ${id} no encontrado`);
        return record;
    }
    async update(id, dto) {
        if (!mongoose_2.Types.ObjectId.isValid(id))
            throw new common_1.BadRequestException('ID inválido');
        const updated = await this.recordModel
            .findByIdAndUpdate(id, {
            ...dto,
            ...(dto.appointmentId && { appointmentId: new mongoose_2.Types.ObjectId(dto.appointmentId) }),
            ...(dto.recordDate && { recordDate: new Date(dto.recordDate) }),
        }, { new: true, runValidators: true })
            .populate('doctorId', 'fullname specialty')
            .populate('patientId', 'firstName lastName')
            .exec();
        if (!updated)
            throw new common_1.NotFoundException(`Registro médico ${id} no encontrado`);
        return updated;
    }
    async remove(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id))
            throw new common_1.BadRequestException('ID inválido');
        const result = await this.recordModel.findByIdAndDelete(id).exec();
        if (!result)
            throw new common_1.NotFoundException(`Registro médico ${id} no encontrado`);
        return { message: 'Registro médico eliminado exitosamente' };
    }
    async getSummary(patientId) {
        if (!mongoose_2.Types.ObjectId.isValid(patientId))
            throw new common_1.BadRequestException('ID de paciente inválido');
        const pid = new mongoose_2.Types.ObjectId(patientId);
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
                .find({ patientId: pid, type: medical_record_enum_1.RecordType.DIAGNOSIS, status: 'active' })
                .sort({ recordDate: -1 })
                .limit(10)
                .lean()
                .exec(),
        ]);
        const byType = {};
        let totalRecords = 0;
        for (const item of byTypeAgg) {
            byType[item._id] = item.count;
            totalRecords += item.count;
        }
        return { totalRecords, byType, latestRecord, activeConditions };
    }
};
exports.MedicalRecordsService = MedicalRecordsService;
exports.MedicalRecordsService = MedicalRecordsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(medical_record_schema_1.MedicalRecordSchema.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MedicalRecordsService);
//# sourceMappingURL=medical-records.service.js.map