/**
 * CAPA DE PRESENTACIÓN — MedicalRecordsController
 *
 * Expone el historial clínico de pacientes.
 * Solo médicos y administradores pueden acceder.
 */
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard }            from '@nestjs/passport';
import { MedicalRecordsService } from '../../application/services/medical-records.service';
import { CreateMedicalRecordDto } from '../dto/medical-records/create-medical-record.dto';
import { UpdateMedicalRecordDto } from '../dto/medical-records/update-medical-record.dto';
import { RolesGuard }            from '../../infrastructure/auth/guards/roles.guard';
import { Roles }                 from '../../infrastructure/auth/decorators/roles.decorator';
import { Role }                  from '../../domain/enums/roles.enum';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('medical-records')
export class MedicalRecordsController {
  constructor(private readonly medicalRecordsService: MedicalRecordsService) {}

  @Post()
  @Roles(Role.MEDICO, Role.ADMIN)
  create(@Body() dto: CreateMedicalRecordDto) {
    return this.medicalRecordsService.create(dto);
  }

  @Get('patient/:id')
  @Roles(Role.MEDICO, Role.ADMIN)
  findByPatient(
    @Param('id') patientId: string,
    @Query('type')   type?:  string,
    @Query('status') status?: string,
    @Query('from')   from?:  string,
    @Query('to')     to?:    string,
    @Query('page')   page?:  string,
    @Query('limit')  limit?: string,
  ) {
    return this.medicalRecordsService.findByPatient(patientId, {
      type: type as any,
      status,
      from,
      to,
      page:  page  ? parseInt(page)  : 1,
      limit: limit ? parseInt(limit) : 10,
    });
  }

  @Get('patient/:id/summary')
  @Roles(Role.MEDICO, Role.ADMIN)
  getSummary(@Param('id') patientId: string) {
    return this.medicalRecordsService.getSummary(patientId);
  }

  @Get(':id')
  @Roles(Role.MEDICO, Role.ADMIN)
  findOne(@Param('id') id: string) {
    return this.medicalRecordsService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.MEDICO, Role.ADMIN)
  update(@Param('id') id: string, @Body() dto: UpdateMedicalRecordDto) {
    return this.medicalRecordsService.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.medicalRecordsService.remove(id);
  }
}
