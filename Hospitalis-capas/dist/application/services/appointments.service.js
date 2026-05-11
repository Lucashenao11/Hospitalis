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
exports.AppointmentsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const appointment_schema_1 = require("../../infrastructure/persistence/schemas/appointment.schema");
let AppointmentsService = class AppointmentsService {
    constructor(appointmentModel) {
        this.appointmentModel = appointmentModel;
    }
    async create(dto) {
        const appointment = new this.appointmentModel(dto);
        return appointment.save();
    }
    async findAll(query) {
        const page = query?.page ?? 1;
        const limit = query?.limit ?? 10;
        const skip = (page - 1) * limit;
        const filter = {};
        if (query?.doctorId)
            filter.doctorId = query.doctorId;
        if (query?.patientId)
            filter.patientId = query.patientId;
        if (query?.status)
            filter.status = query.status;
        if (query?.date) {
            const start = new Date(query.date);
            const end = new Date(query.date);
            end.setDate(end.getDate() + 1);
            filter.date = { $gte: start, $lt: end };
        }
        const [data, total] = await Promise.all([
            this.appointmentModel
                .find(filter)
                .populate('patientId', 'firstName lastName email phone')
                .populate('doctorId', 'fullname email specialty')
                .skip(skip)
                .limit(limit)
                .sort({ date: 1, startTime: 1 }),
            this.appointmentModel.countDocuments(filter),
        ]);
        return { data, total, page, limit };
    }
    async findOne(id) {
        const appointment = await this.appointmentModel
            .findById(id)
            .populate('patientId', 'firstName lastName email phone dateOfBirth gender')
            .populate('doctorId', 'fullname email specialty');
        if (!appointment)
            throw new common_1.NotFoundException('Cita no encontrada');
        return appointment;
    }
    async update(id, dto) {
        const appointment = await this.appointmentModel
            .findByIdAndUpdate(id, { $set: dto }, { new: true, runValidators: true })
            .populate('patientId', 'firstName lastName')
            .populate('doctorId', 'fullname specialty');
        if (!appointment)
            throw new common_1.NotFoundException('Cita no encontrada');
        return appointment;
    }
    async remove(id) {
        const appointment = await this.appointmentModel.findByIdAndDelete(id);
        if (!appointment)
            throw new common_1.NotFoundException('Cita no encontrada');
        return { message: 'Cita eliminada exitosamente' };
    }
    async findTodayByDoctor(_doctorId) {
        const now = new Date();
        const todayStr = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, '0')}-${String(now.getUTCDate()).padStart(2, '0')}`;
        const start = new Date(`${todayStr}T00:00:00.000Z`);
        const end = new Date(`${todayStr}T23:59:59.999Z`);
        return this.appointmentModel
            .find({ date: { $gte: start, $lte: end } })
            .populate('patientId', 'firstName lastName')
            .populate('doctorId', 'fullname specialty')
            .sort({ startTime: 1 });
    }
};
exports.AppointmentsService = AppointmentsService;
exports.AppointmentsService = AppointmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(appointment_schema_1.AppointmentSchema.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AppointmentsService);
//# sourceMappingURL=appointments.service.js.map