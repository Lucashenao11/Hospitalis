import { UsersService } from '../../application/services/users.service';
import { Role } from '../../domain/enums/roles.enum';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(req: any): Promise<import("mongoose").Document<unknown, {}, import("../../infrastructure/persistence/schemas/user.schema").UserDocument, {}, {}> & import("../../infrastructure/persistence/schemas/user.schema").UserSchema & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findAll(role?: string, isActive?: string, page?: string, limit?: string): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("../../infrastructure/persistence/schemas/user.schema").UserDocument, {}, {}> & import("../../infrastructure/persistence/schemas/user.schema").UserSchema & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(req: any, id: string): Promise<import("mongoose").Document<unknown, {}, import("../../infrastructure/persistence/schemas/user.schema").UserDocument, {}, {}> & import("../../infrastructure/persistence/schemas/user.schema").UserSchema & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(req: any, id: string, dto: {
        fullname?: string;
        email?: string;
        specialty?: string;
        role?: Role;
        isActive?: boolean;
        currentPassword?: string;
        password?: string;
    }): Promise<import("mongoose").Document<unknown, {}, import("../../infrastructure/persistence/schemas/user.schema").UserDocument, {}, {}> & import("../../infrastructure/persistence/schemas/user.schema").UserSchema & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
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
}
