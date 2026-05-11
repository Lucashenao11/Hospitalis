"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicalRecordEntity = void 0;
const medical_record_enum_1 = require("../enums/medical-record.enum");
class MedicalRecordEntity {
    constructor() {
        this.status = medical_record_enum_1.RecordStatus.ACTIVE;
        this.attachments = [];
        this.recordDate = new Date();
        this.notes = '';
        this.tags = [];
    }
}
exports.MedicalRecordEntity = MedicalRecordEntity;
//# sourceMappingURL=medical-record.entity.js.map