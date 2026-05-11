/**
 * CAPA DE APLICACIÓN — UsersService
 *
 * Lógica de negocio para gestión de usuarios.
 * Orquesta las operaciones de persistencia a través del modelo de Mongoose
 * inyectado desde la capa de Infraestructura.
 */
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserSchema, UserDocument } from '../../infrastructure/persistence/schemas/user.schema';
import { Role } from '../../domain/enums/roles.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserSchema.name)
    private userModel: Model<UserDocument>,
  ) {}

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async create(userData: Partial<UserDocument>) {
    const user = new this.userModel(userData);
    return user.save();
  }

  async findAll(query?: {
    role?: string;
    isActive?: boolean;
    page?: number;
    limit?: number;
  }) {
    const page  = query?.page  ?? 1;
    const limit = query?.limit ?? 10;
    const skip  = (page - 1) * limit;
    const filter: any = {};
    if (query?.role !== undefined && query.role !== '') filter.role = query.role;
    if (query?.isActive !== undefined) filter.isActive = query.isActive;

    const [data, total] = await Promise.all([
      this.userModel.find(filter).select('-password').skip(skip).limit(limit).sort({ createdAt: -1 }),
      this.userModel.countDocuments(filter),
    ]);
    return { data, total, page, limit };
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id).select('-password');
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  async update(
    id: string,
    dto: {
      fullname?: string;
      email?: string;
      specialty?: string;
      role?: Role;
      isActive?: boolean;
      currentPassword?: string;
      password?: string;
    },
  ) {
    if (dto.email) {
      const existing = await this.userModel.findOne({ email: dto.email });
      if (existing && existing._id.toString() !== id) {
        throw new ConflictException('El correo ya está en uso');
      }
    }

    const currentUser = await this.userModel.findById(id);
    if (!currentUser) throw new NotFoundException('Usuario no encontrado');

    const updateData: any = { ...dto };
    delete updateData.currentPassword;

    if (dto.password) {
      if (!dto.currentPassword) {
        throw new ConflictException('Debes proporcionar la contraseña actual');
      }
      const isMatch = await bcrypt.compare(dto.currentPassword, currentUser.password);
      if (!isMatch) throw new ConflictException('La contraseña actual es incorrecta');
      updateData.password = await bcrypt.hash(dto.password, 10);
    }

    const user = await this.userModel
      .findByIdAndUpdate(id, { $set: updateData }, { new: true, runValidators: true })
      .select('-password');
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  async remove(id: string) {
    const user = await this.userModel.findByIdAndUpdate(
      id, { $set: { isActive: false } }, { new: true },
    );
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return { message: 'Usuario desactivado exitosamente' };
  }

  async hardDelete(id: string) {
    const user = await this.userModel.findByIdAndDelete(id);
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return { message: 'Usuario eliminado permanentemente' };
  }

  async updatePassword(id: string, hashedPassword: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(id, { $set: { password: hashedPassword } });
  }
}
