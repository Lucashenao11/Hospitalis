"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BloodType = exports.PatientStatus = void 0;
var PatientStatus;
(function (PatientStatus) {
    PatientStatus["ACTIVE"] = "active";
    PatientStatus["INACTIVE"] = "inactive";
    PatientStatus["INPATIENT"] = "inpatient";
    PatientStatus["DISCHARGED"] = "discharged";
})(PatientStatus || (exports.PatientStatus = PatientStatus = {}));
var BloodType;
(function (BloodType) {
    BloodType["A_POS"] = "A+";
    BloodType["A_NEG"] = "A-";
    BloodType["B_POS"] = "B+";
    BloodType["B_NEG"] = "B-";
    BloodType["AB_POS"] = "AB+";
    BloodType["AB_NEG"] = "AB-";
    BloodType["O_POS"] = "O+";
    BloodType["O_NEG"] = "O-";
})(BloodType || (exports.BloodType = BloodType = {}));
//# sourceMappingURL=patient-status.enum.js.map