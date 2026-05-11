import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PatientsController } from '../presentation/controllers/patients.controller';
import { PatientsService }    from '../application/services/patients.service';
import { PatientSchema, PatientMongooseSchema } from '../infrastructure/persistence/schemas/patient.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PatientSchema.name, schema: PatientMongooseSchema },
    ]),
  ],
  controllers: [PatientsController],
  providers:   [PatientsService],
  exports:     [PatientsService],
})
export class PatientsModule {}
