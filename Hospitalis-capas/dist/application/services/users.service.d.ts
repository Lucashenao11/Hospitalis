import { Model } from 'mongoose';
import { UserSchema, UserDocument } from '../../infrastructure/persistence/schemas/user.schema';
import { Role } from '../../domain/enums/roles.enum';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    findByEmail(email: string): Promise<import("mongoose").Document<unknown, {}, UserDocument, {}, {}> & UserSchema & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    create(userData: Partial<UserDocument>): Promise<import("mongoose").Document<unknown, {}, UserDocument, {}, {}> & UserSchema & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findAll(query?: {
        role?: string;
        isActive?: boolean;
        page?: number;
        limit?: number;
    }): Promise<{
        data: (import("mongoose").Document<unknown, {}, UserDocument, {}, {}> & UserSchema & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, UserDocument, {}, {}> & UserSchema & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(id: string, dto: {
        fullname?: string;
        email?: string;
        specialty?: string;
        role?: Role;
        isActive?: boolean;
        currentPassword?: string;
        password?: string;
    }): Promise<import("mongoose").Document<unknown, {}, UserDocument, {}, {}> & UserSchema & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    hardDelete(id: string): Promise<{
        message: string;
    }>;
    updatePassword(id: string, hashedPassword: string): Promise<void>;
}
