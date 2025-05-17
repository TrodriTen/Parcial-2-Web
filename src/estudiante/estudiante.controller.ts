import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { CrearEstudianteDTO } from './estudiante.dto/estudiante.dto';
import { InscribirActividadDTO } from '../inscripcion/inscripcion.dto/inscripcion.dto';
import { EstudianteDTO } from './estudiante.dto/estudiante.dto';
import { InscripcionDTO } from '../inscripcion/inscripcion.dto/inscripcion.dto';

@Controller('estudiante')
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}

  @Post()
  crear(@Body() data: CrearEstudianteDTO): Promise<EstudianteDTO> {
    return this.estudianteService.crearEstudiante(data);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<EstudianteDTO> {
    return this.estudianteService.findEstudianteById(+id);
  }

  @Post(':id/inscribir')
  inscribirse(
    @Param('id') id: number,
    @Body() body: InscribirActividadDTO,
  ): Promise<InscripcionDTO> {
    return this.estudianteService.inscribirseActividad(+id, body.actividadId);
  }
}
