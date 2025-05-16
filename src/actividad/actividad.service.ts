import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActividadEntity } from './actividad.entity/actividad.entity';
import { InscripcionEntity } from '../inscripcion/inscripcion.entity/inscripcion.entity';

@Injectable()
export class ActividadService {
  constructor(
    @InjectRepository(ActividadEntity)
    private actividadRepo: Repository<ActividadEntity>,

    @InjectRepository(InscripcionEntity)
    private inscripcionRepo: Repository<InscripcionEntity>,
  ) {}

  async crearActividad(data: any): Promise<ActividadEntity> {
    if (!/^([a-zA-Z0-9 ]+)$/.test(data.titulo) || data.titulo.length < 15) {
      throw new BadRequestException('Título inválido');
    }
    const nueva = new ActividadEntity();
    nueva.titulo = data.titulo;
    nueva.fecha = data.fecha;
    nueva.cupoMaximo = data.cupoMaximo;
    nueva.estado = 0;

    return this.actividadRepo.save(nueva);

  }

  async cambiarEstado(id: number, estado: number): Promise<ActividadEntity> {
    const actividad = await this.actividadRepo.findOne({ where: { id } });
    if (!actividad) throw new NotFoundException('Actividad no encontrada');

    const inscritos = await this.inscripcionRepo.count({ where: { actividad: { id } } });
    const porcentaje = inscritos / actividad.cupoMaximo;

    if (estado === 1 && porcentaje < 0.8) {
      throw new BadRequestException('No se puede cerrar, menos del 80% de inscritos');
    }
    if (estado === 2 && inscritos < actividad.cupoMaximo) {
      throw new BadRequestException('No se puede finalizar, aún hay cupos');
    }

    actividad.estado = estado;
    return this.actividadRepo.save(actividad);
  }

  async findAllActividadesByDate(fecha: string): Promise<ActividadEntity[]> {
    return this.actividadRepo.find({ where: { fecha } });
  }
}
