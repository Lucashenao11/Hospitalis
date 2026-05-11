import { Role } from '../enums/roles.enum';
export declare class UserEntity {
    id?: string;
    fullname: string;
    email: string;
    password: string;
    specialty: string;
    role: Role;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
