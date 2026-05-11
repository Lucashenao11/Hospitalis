import { UserEntity } from '../entities/user.entity';
export interface IUserRepository {
    findByEmail(email: string): Promise<UserEntity | null>;
    findById(id: string): Promise<UserEntity | null>;
    findAll(filters: {
        role?: string;
        isActive?: boolean;
        page?: number;
        limit?: number;
    }): Promise<{
        data: UserEntity[];
        total: number;
        page: number;
        limit: number;
    }>;
    create(data: Partial<UserEntity>): Promise<UserEntity>;
    update(id: string, data: Partial<UserEntity>): Promise<UserEntity | null>;
    softDelete(id: string): Promise<UserEntity | null>;
    hardDelete(id: string): Promise<UserEntity | null>;
    updatePassword(id: string, hashedPassword: string): Promise<void>;
}
export declare const USER_REPOSITORY = "USER_REPOSITORY";
