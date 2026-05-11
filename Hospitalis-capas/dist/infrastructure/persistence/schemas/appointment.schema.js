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
exports.AppointmentMongooseSchema = exports.AppointmentSchema = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const appointment_enum_1 = require("../../../domain/enums/appointment.enum");
let AppointmentSchema = class AppointmentSchema {
};
exports.AppointmentSchema = AppointmentSchema;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'PatientSchema', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], AppointmentSchema.prototype, "patientId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'UserSchema', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], AppointmentSchema.prototype, "doctorId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], AppointmentSchema.prototype, "date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], AppointmentSchema.prototype, "startTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], AppointmentSchema.prototype, "endTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: appointment_enum_1.AppointmentType, default: appointment_enum_1.AppointmentType.CHECKUP }),
    __metadata("design:type", String)
], AppointmentSchema.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: appointment_enum_1.AppointmentStatus, default: appointment_enum_1.AppointmentStatus.SCHEDULED }),
    __metadata("design:type", String)
], AppointmentSchema.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], AppointmentSchema.prototype, "reason", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], AppointmentSchema.prototype, "notes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], AppointmentSchema.prototype, "room", void 0);
exports.AppointmentSchema = AppointmentSchema = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], AppointmentSchema);
exports.AppointmentMongooseSchema = mongoose_1.SchemaFactory.createForClass(AppointmentSchema);
//# sourceMappingURL=appointment.schema.js.map