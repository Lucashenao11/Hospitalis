import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MedicalRecordsController } from '../presentation/controllers/medical-records.controller';
import { MedicalRecordsService }    from '../application/services/medical-records.service';
import { MedicalRecordSchema, MedicalRecordMongooseSchema } from '../infrastructure/persistence/schemas/medical-record.schema';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MedicalRecordSchema.name, schema: MedicalRecordMongooseSchema },
    ]),
    AuthModule,
  ],
  controllers: [MedicalRecordsController],
  providers:   [MedicalRecordsService],
  exports:     [MedicalRecordsService],
})
export class MedicalRecordsModule {}
