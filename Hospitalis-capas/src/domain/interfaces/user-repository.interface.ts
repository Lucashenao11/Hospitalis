/**
 * CAPA DE DOMINIO — Interfaz IUserRepository
 *
 * Define el contrato que cualquier repositorio de usuarios debe cumplir.
 * La capa de Aplicación depende de esta interfaz, NO de la implementación
 * concreta de MongoDB. Esto hace la lógica de negocio independiente de la BD.
 *
 * Principio: Dependency Inversion (la D de SOLID)
 * → El código de alto nivel (servicios) no depende del código de bajo nivel
 *   (MongoDB), ambos dependen de abstracciones (esta interfaz).
 */
import { UserEntity } from '../entities/user.entity';

export interface IUserRepository {
  findByEmail(email: string): Promise<UserEntity | null>;
  findById(id: string): Promise<UserEntity | null>;
  findAll(filters: {
    role?: string;
    isActive?: boolean;
    page?: number;
    limit?: number;
  }): Promise<{ data: UserEntity[]; total: number; page: number; limit: number }>;
  create(data: Partial<UserEntity>): Promise<UserEntity>;
  update(id: string, data: Partial<UserEntity>): Promise<UserEntity | null>;
  softDelete(id: string): Promise<UserEntity | null>;
  hardDelete(id: string): Promise<UserEntity | null>;
  updatePassword(id: string, hashedPassword: string): Promise<void>;
}

export const USER_REPOSITORY = 'USER_REPOSITORY';
