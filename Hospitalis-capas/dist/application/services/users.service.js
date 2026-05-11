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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const user_schema_1 = require("../../infrastructure/persistence/schemas/user.schema");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async findByEmail(email) {
        return this.userModel.findOne({ email });
    }
    async create(userData) {
        const user = new this.userModel(userData);
        return user.save();
    }
    async findAll(query) {
        const page = query?.page ?? 1;
        const limit = query?.limit ?? 10;
        const skip = (page - 1) * limit;
        const filter = {};
        if (query?.role !== undefined && query.role !== '')
            filter.role = query.role;
        if (query?.isActive !== undefined)
            filter.isActive = query.isActive;
        const [data, total] = await Promise.all([
            this.userModel.find(filter).select('-password').skip(skip).limit(limit).sort({ createdAt: -1 }),
            this.userModel.countDocuments(filter),
        ]);
        return { data, total, page, limit };
    }
    async findOne(id) {
        const user = await this.userModel.findById(id).select('-password');
        if (!user)
            throw new common_1.NotFoundException('Usuario no encontrado');
        return user;
    }
    async update(id, dto) {
        if (dto.email) {
            const existing = await this.userModel.findOne({ email: dto.email });
            if (existing && existing._id.toString() !== id) {
                throw new common_1.ConflictException('El correo ya está en uso');
            }
        }
        const currentUser = await this.userModel.findById(id);
        if (!currentUser)
            throw new common_1.NotFoundException('Usuario no encontrado');
        const updateData = { ...dto };
        delete updateData.currentPassword;
        if (dto.password) {
            if (!dto.currentPassword) {
                throw new common_1.ConflictException('Debes proporcionar la contraseña actual');
            }
            const isMatch = await bcrypt.compare(dto.currentPassword, currentUser.password);
            if (!isMatch)
                throw new common_1.ConflictException('La contraseña actual es incorrecta');
            updateData.password = await bcrypt.hash(dto.password, 10);
        }
        const user = await this.userModel
            .findByIdAndUpdate(id, { $set: updateData }, { new: true, runValidators: true })
            .select('-password');
        if (!user)
            throw new common_1.NotFoundException('Usuario no encontrado');
        return user;
    }
    async remove(id) {
        const user = await this.userModel.findByIdAndUpdate(id, { $set: { isActive: false } }, { new: true });
        if (!user)
            throw new common_1.NotFoundException('Usuario no encontrado');
        return { message: 'Usuario desactivado exitosamente' };
    }
    async hardDelete(id) {
        const user = await this.userModel.findByIdAndDelete(id);
        if (!user)
            throw new common_1.NotFoundException('Usuario no encontrado');
        return { message: 'Usuario eliminado permanentemente' };
    }
    async updatePassword(id, hashedPassword) {
        await this.userModel.findByIdAndUpdate(id, { $set: { password: hashedPassword } });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.UserSchema.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map