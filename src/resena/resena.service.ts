// =========================
// resena.service.ts
// =========================
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResenaEntity } from './resena.entity/resena.entity';
import { ActividadEntity } from '../actividad/actividad.entity/actividad.entity';
import { EstudianteEntity } from '../estudiante/estudiante.entity/estudiante.entity';
import { InscripcionEntity } from '../inscripcion/inscripcion.entity/inscripcion.entity';

@Injectable()
export class ResenaService {
  constructor(
    @InjectRepository(ResenaEntity)
    private resenaRepo: Repository<ResenaEntity>,

    @InjectRepository(ActividadEntity)
    private actividadRepo: Repository<ActividadEntity>,

    @InjectRepository(EstudianteEntity)
    private estudianteRepo: Repository<EstudianteEntity>,

    @InjectRepository(InscripcionEntity)
    private inscripcionRepo: Repository<InscripcionEntity>,
  ) {}

  async agregarResena(data: any): Promise<ResenaEntity> {
    const actividad = await this.actividadRepo.findOne({ where: { id: data.actividadId } });
    if (!actividad || actividad.estado !== 2) throw new BadRequestException('Actividad no finalizada');

    const estudiante = await this.estudianteRepo.findOne({ where: { id: data.estudianteId } });
    if (!estudiante) throw new NotFoundException('Estudiante no existe');

    const inscripcion = await this.inscripcionRepo.findOne({
      where: {
        estudiante: { id: data.estudianteId },
        actividad: { id: data.actividadId },
      }
    });
    if (!inscripcion) throw new BadRequestException('Estudiante no estuvo inscrito');

    const resena = this.resenaRepo.create({
      comentario: data.comentario,
      calificacion: data.calificacion,
      fecha: data.fecha,
      estudiante,
      actividad
    });
    return this.resenaRepo.save(resena);
  }
}
