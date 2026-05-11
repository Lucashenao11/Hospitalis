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
exports.MedicalRecordsController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const medical_records_service_1 = require("../../application/services/medical-records.service");
const create_medical_record_dto_1 = require("../dto/medical-records/create-medical-record.dto");
const update_medical_record_dto_1 = require("../dto/medical-records/update-medical-record.dto");
const roles_guard_1 = require("../../infrastructure/auth/guards/roles.guard");
const roles_decorator_1 = require("../../infrastructure/auth/decorators/roles.decorator");
const roles_enum_1 = require("../../domain/enums/roles.enum");
let MedicalRecordsController = class MedicalRecordsController {
    constructor(medicalRecordsService) {
        this.medicalRecordsService = medicalRecordsService;
    }
    create(dto) {
        return this.medicalRecordsService.create(dto);
    }
    findByPatient(patientId, type, status, from, to, page, limit) {
        return this.medicalRecordsService.findByPatient(patientId, {
            type: type,
            status,
            from,
            to,
            page: page ? parseInt(page) : 1,
            limit: limit ? parseInt(limit) : 10,
        });
    }
    getSummary(patientId) {
        return this.medicalRecordsService.getSummary(patientId);
    }
    findOne(id) {
        return this.medicalRecordsService.findOne(id);
    }
    update(id, dto) {
        return this.medicalRecordsService.update(id, dto);
    }
    remove(id) {
        return this.medicalRecordsService.remove(id);
    }
};
exports.MedicalRecordsController = MedicalRecordsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.MEDICO, roles_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_medical_record_dto_1.CreateMedicalRecordDto]),
    __metadata("design:returntype", void 0)
], MedicalRecordsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('patient/:id'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.MEDICO, roles_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('type')),
    __param(2, (0, common_1.Query)('status')),
    __param(3, (0, common_1.Query)('from')),
    __param(4, (0, common_1.Query)('to')),
    __param(5, (0, common_1.Query)('page')),
    __param(6, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], MedicalRecordsController.prototype, "findByPatient", null);
__decorate([
    (0, common_1.Get)('patient/:id/summary'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.MEDICO, roles_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MedicalRecordsController.prototype, "getSummary", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.MEDICO, roles_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MedicalRecordsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.MEDICO, roles_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_medical_record_dto_1.UpdateMedicalRecordDto]),
    __metadata("design:returntype", void 0)
], MedicalRecordsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MedicalRecordsController.prototype, "remove", null);
exports.MedicalRecordsController = MedicalRecordsController = __decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, common_1.Controller)('medical-records'),
    __metadata("design:paramtypes", [medical_records_service_1.MedicalRecordsService])
], MedicalRecordsController);
//# sourceMappingURL=medical-records.controller.js.map