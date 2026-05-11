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
exports.PatientsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const patient_schema_1 = require("../../infrastructure/persistence/schemas/patient.schema");
let PatientsService = class PatientsService {
    constructor(patientModel) {
        this.patientModel = patientModel;
    }
    async create(dto) {
        const existing = await this.patientModel.findOne({ email: dto.email });
        if (existing)
            throw new common_1.ConflictException('Ya existe un paciente con este correo');
        const patient = new this.patientModel(dto);
        return patient.save();
    }
    async findAll(query) {
        const page = query?.page ?? 1;
        const limit = query?.limit ?? 10;
        const skip = (page - 1) * limit;
        const filter = {};
        if (query?.status)
            filter.status = query.status;
        if (query?.search) {
            const regex = new RegExp(query.search, 'i');
            filter.$or = [
                { firstName: regex },
                { lastName: regex },
                { email: regex },
                { phone: regex },
            ];
        }
        const [data, total] = await Promise.all([
            this.patientModel.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 }),
            this.patientModel.countDocuments(filter),
        ]);
        return { data, total, page, limit };
    }
    async findOne(id) {
        const patient = await this.patientModel.findById(id);
        if (!patient)
            throw new common_1.NotFoundException('Paciente no encontrado');
        return patient;
    }
    async update(id, dto) {
        const patient = await this.patientModel.findByIdAndUpdate(id, { $set: dto }, { new: true, runValidators: true });
        if (!patient)
            throw new common_1.NotFoundException('Paciente no encontrado');
        return patient;
    }
    async remove(id) {
        const patient = await this.patientModel.findByIdAndDelete(id);
        if (!patient)
            throw new common_1.NotFoundException('Paciente no encontrado');
        return { message: 'Paciente eliminado exitosamente' };
    }
};
exports.PatientsService = PatientsService;
exports.PatientsService = PatientsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(patient_schema_1.PatientSchema.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PatientsService);
//# sourceMappingURL=patients.service.js.map