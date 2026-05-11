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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientMongooseSchema = exports.PatientSchema = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const patient_status_enum_1 = require("../../../domain/enums/patient-status.enum");
let PatientSchema = class PatientSchema {
};
exports.PatientSchema = PatientSchema;
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], PatientSchema.prototype, "firstName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], PatientSchema.prototype, "lastName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], PatientSchema.prototype, "dateOfBirth", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ['male', 'female', 'other'] }),
    __metadata("design:type", String)
], PatientSchema.prototype, "gender", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true, lowercase: true, trim: true }),
    __metadata("design:type", String)
], PatientSchema.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], PatientSchema.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], PatientSchema.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], PatientSchema.prototype, "emergencyContactName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], PatientSchema.prototype, "emergencyContactPhone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: patient_status_enum_1.BloodType, default: null }),
    __metadata("design:type", String)
], PatientSchema.prototype, "bloodType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], PatientSchema.prototype, "allergies", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], PatientSchema.prototype, "chronicConditions", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], PatientSchema.prototype, "notes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: patient_status_enum_1.PatientStatus, default: patient_status_enum_1.PatientStatus.ACTIVE }),
    __metadata("design:type", String)
], PatientSchema.prototype, "status", void 0);
exports.PatientSchema = PatientSchema = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], PatientSchema);
exports.PatientMongooseSchema = mongoose_1.SchemaFactory.createForClass(PatientSchema);
//# sourceMappingURL=patient.schema.js.map