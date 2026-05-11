import { Document } from 'mongoose';
import { Role } from '../../../domain/enums/roles.enum';
export type UserDocument = UserSchema & Document;
export declare class UserSchema {
    fullname: string;
    email: string;
    password: string;
    specialty: string;
    role: Role;
    isActive: boolean;
}
export declare const UserMongooseSchema: import("mongoose").Schema<UserSchema, import("mongoose").Model<UserSchema, any, any, any, Document<unknown, any, UserSchema, any, {}> & UserSchema & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, UserSchema, Document<unknown, {}, import("mongoose").FlatRecord<UserSchema>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<UserSchema> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
