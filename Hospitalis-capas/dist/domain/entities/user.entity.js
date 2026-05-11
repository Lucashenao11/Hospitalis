"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
const roles_enum_1 = require("../enums/roles.enum");
class UserEntity {
    constructor() {
        this.specialty = '';
        this.role = roles_enum_1.Role.MEDICO;
        this.isActive = true;
    }
}
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map