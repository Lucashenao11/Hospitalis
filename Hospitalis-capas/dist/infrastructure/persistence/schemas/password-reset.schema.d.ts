import { Document, Types } from 'mongoose';
export type PasswordResetTokenDocument = PasswordResetTokenSchema & Document;
export declare class PasswordResetTokenSchema {
    token: string;
    userId: Types.ObjectId;
    expiresAt: Date;
    used: boolean;
}
export declare const PasswordResetTokenMongooseSchema: import("mongoose").Schema<PasswordResetTokenSchema, import("mongoose").Model<PasswordResetTokenSchema, any, any, any, Document<unknown, any, PasswordResetTokenSchema, any, {}> & PasswordResetTokenSchema & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PasswordResetTokenSchema, Document<unknown, {}, import("mongoose").FlatRecord<PasswordResetTokenSchema>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<PasswordResetTokenSchema> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
