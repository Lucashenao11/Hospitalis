"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordStatus = exports.RecordType = void 0;
var RecordType;
(function (RecordType) {
    RecordType["DIAGNOSIS"] = "diagnosis";
    RecordType["CLINICAL_NOTE"] = "clinical_note";
    RecordType["LAB_RESULT"] = "lab_result";
    RecordType["PRESCRIPTION"] = "prescription";
    RecordType["PROCEDURE"] = "procedure";
    RecordType["VITAL_SIGNS"] = "vital_signs";
})(RecordType || (exports.RecordType = RecordType = {}));
var RecordStatus;
(function (RecordStatus) {
    RecordStatus["ACTIVE"] = "active";
    RecordStatus["RESOLVED"] = "resolved";
    RecordStatus["ARCHIVED"] = "archived";
})(RecordStatus || (exports.RecordStatus = RecordStatus = {}));
//# sourceMappingURL=medical-record.enum.js.map