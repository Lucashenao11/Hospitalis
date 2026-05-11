import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppointmentsController } from '../presentation/controllers/appointments.controller';
import { AppointmentsService }    from '../application/services/appointments.service';
import { AppointmentSchema, AppointmentMongooseSchema } from '../infrastructure/persistence/schemas/appointment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AppointmentSchema.name, schema: AppointmentMongooseSchema },
    ]),
  ],
  controllers: [AppointmentsController],
  providers:   [AppointmentsService],
  exports:     [AppointmentsService],
})
export class AppointmentsModule {}
