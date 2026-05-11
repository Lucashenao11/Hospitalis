"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientEntity = void 0;
const patient_status_enum_1 = require("../enums/patient-status.enum");
class PatientEntity {
    constructor() {
        this.phone = '';
        this.address = '';
        this.emergencyContactName = '';
        this.emergencyContactPhone = '';
        this.allergies = [];
        this.chronicConditions = [];
        this.notes = '';
        this.status = patient_status_enum_1.PatientStatus.ACTIVE;
    }
}
exports.PatientEntity = PatientEntity;
//# sourceMappingURL=patient.entity.js.map