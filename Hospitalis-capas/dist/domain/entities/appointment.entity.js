"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentEntity = void 0;
const appointment_enum_1 = require("../enums/appointment.enum");
class AppointmentEntity {
    constructor() {
        this.type = appointment_enum_1.AppointmentType.CHECKUP;
        this.status = appointment_enum_1.AppointmentStatus.SCHEDULED;
        this.notes = '';
        this.room = '';
    }
}
exports.AppointmentEntity = AppointmentEntity;
//# sourceMappingURL=appointment.entity.js.map