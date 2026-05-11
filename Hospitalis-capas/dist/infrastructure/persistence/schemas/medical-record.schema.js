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
exports.MedicalRecordMongooseSchema = exports.MedicalRecordSchema = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const medical_record_enum_1 = require("../../../domain/enums/medical-record.enum");
let MedicalRecordSchema = class MedicalRecordSchema {
};
exports.MedicalRecordSchema = MedicalRecordSchema;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'PatientSchema', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], MedicalRecordSchema.prototype, "patientId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'UserSchema', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], MedicalRecordSchema.prototype, "doctorId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'AppointmentSchema', default: null }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], MedicalRecordSchema.prototype, "appointmentId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: medical_record_enum_1.RecordType, required: true }),
    __metadata("design:type", String)
], MedicalRecordSchema.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: medical_record_enum_1.RecordStatus, default: medical_record_enum_1.RecordStatus.ACTIVE }),
    __metadata("design:type", String)
], MedicalRecordSchema.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], MedicalRecordSchema.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], MedicalRecordSchema.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], MedicalRecordSchema.prototype, "icdCode", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, default: null }),
    __metadata("design:type", Object)
], MedicalRecordSchema.prototype, "vitals", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, default: null }),
    __metadata("design:type", Object)
], MedicalRecordSchema.prototype, "labResult", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], MedicalRecordSchema.prototype, "attachments", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], MedicalRecordSchema.prototype, "recordDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], MedicalRecordSchema.prototype, "notes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], MedicalRecordSchema.prototype, "tags", void 0);
exports.MedicalRecordSchema = MedicalRecordSchema = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], MedicalRecordSchema);
exports.MedicalRecordMongooseSchema = mongoose_1.SchemaFactory.createForClass(MedicalRecordSchema);
exports.MedicalRecordMongooseSchema.index({ patientId: 1, recordDate: -1 });
exports.MedicalRecordMongooseSchema.index({ patientId: 1, type: 1 });
exports.MedicalRecordMongooseSchema.index({ doctorId: 1 });
//# sourceMappingURL=medical-record.schema.js.map