import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersController } from '../presentation/controllers/users.controller';
import { UsersService }    from '../application/services/users.service';
import { UserSchema, UserMongooseSchema } from '../infrastructure/persistence/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserSchema.name, schema: UserMongooseSchema },
    ]),
  ],
  controllers: [UsersController],
  providers:   [UsersService],
  exports:     [UsersService],
})
export class UsersModule {}
