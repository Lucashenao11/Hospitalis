"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentType = exports.AppointmentStatus = void 0;
var AppointmentStatus;
(function (AppointmentStatus) {
    AppointmentStatus["SCHEDULED"] = "scheduled";
    AppointmentStatus["CONFIRMED"] = "confirmed";
    AppointmentStatus["IN_PROGRESS"] = "in_progress";
    AppointmentStatus["COMPLETED"] = "completed";
    AppointmentStatus["CANCELLED"] = "cancelled";
    AppointmentStatus["NO_SHOW"] = "no_show";
})(AppointmentStatus || (exports.AppointmentStatus = AppointmentStatus = {}));
var AppointmentType;
(function (AppointmentType) {
    AppointmentType["CHECKUP"] = "checkup";
    AppointmentType["FOLLOW_UP"] = "follow_up";
    AppointmentType["CONSULTATION"] = "consultation";
    AppointmentType["EMERGENCY"] = "emergency";
    AppointmentType["PROCEDURE"] = "procedure";
    AppointmentType["LAB"] = "lab";
})(AppointmentType || (exports.AppointmentType = AppointmentType = {}));
//# sourceMappingURL=appointment.enum.js.map