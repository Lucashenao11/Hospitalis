/**
 * CAPA DE PRESENTACIÓN — PatientsController
 *
 * Expone el CRUD de pacientes como endpoints REST.
 * El guard JwtAuthGuard (infraestructura) protege todos los endpoints.
 * La lógica real está en PatientsService (aplicación).
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
import { PatientsService }    from '../../application/services/patients.service';
import { CreatePatientDto }   from '../dto/patients/create-patient.dto';
import { UpdatePatientDto }   from '../dto/patients/update-patient.dto';
import { JwtAuthGuard }       from '../../infrastructure/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  create(@Body() dto: CreatePatientDto) {
    return this.patientsService.create(dto);
  }

  @Get()
  findAll(
    @Query('search') search?: string,
    @Query('status') status?: string,
    @Query('page')   page?:   string,
    @Query('limit')  limit?:  string,
  ) {
    return this.patientsService.findAll({
      search,
      status,
      page:  page  ? parseInt(page,  10) : 1,
      limit: limit ? parseInt(limit, 10) : 10,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePatientDto) {
    return this.patientsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientsService.remove(id);
  }
}
