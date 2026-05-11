/**
 * AppModule — Módulo raíz de la aplicación
 *
 * En la arquitectura por capas, este módulo "ensambla" todos los
 * submódulos funcionales. Cada submódulo está organizado internamente
 * siguiendo las cuatro capas: Presentación → Aplicación → Dominio → Infraestructura.
 */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule }           from './modules/auth.module';
import { UsersModule }          from './modules/users.module';
import { PatientsModule }       from './modules/patients.module';
import { AppointmentsModule }   from './modules/appointments.module';
import { MedicalRecordsModule } from './modules/medical-records.module';

@Module({
  imports: [
    // Configuración global: carga el .env automáticamente
    ConfigModule.forRoot({ isGlobal: true }),

    // Conexión a MongoDB usando la variable MONGO_URI del .env
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('MONGO_URI');
        if (!uri) throw new Error('MONGO_URI no está definida en el .env');
        return { uri };
      },
    }),

    // Módulos funcionales — cada uno encapsula sus cuatro capas internamente
    AuthModule,
    UsersModule,
    PatientsModule,
    AppointmentsModule,
    MedicalRecordsModule,
  ],
})
export class AppModule {}
