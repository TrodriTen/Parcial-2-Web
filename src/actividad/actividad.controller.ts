import { Controller, Post, Put, Get, Body, Param } from '@nestjs/common';
import { ActividadService } from './actividad.service';
import { CrearActividadDTO, CambiarEstadoDTO } from './actividad.dto/actividad.dto';
import { ActividadDTO } from './actividad.dto/actividad.dto';

@Controller('actividad')
export class ActividadController {
  constructor(private readonly actividadService: ActividadService) {}

  @Post()
  crear(@Body() data: CrearActividadDTO): Promise<ActividadDTO> {
    return this.actividadService.crearActividad(data);
  }

  @Put(':id/estado')
  cambiarEstado(
    @Param('id') id: number,
    @Body() body: CambiarEstadoDTO,
  ): Promise<ActividadDTO> {
    return this.actividadService.cambiarEstado(+id, body.estado);
  }

  @Get('fecha/:fecha')
  obtenerPorFecha(
    @Param('fecha') fecha: string,
  ): Promise<ActividadDTO[]> {
    return this.actividadService.findAllActividadesByDate(fecha);
  }
}
