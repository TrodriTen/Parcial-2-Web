import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstudianteEntity } from './estudiante.entity/estudiante.entity';
import { InscripcionEntity } from '../inscripcion/inscripcion.entity/inscripcion.entity';
import { ActividadEntity } from '../actividad/actividad.entity/actividad.entity';

@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(EstudianteEntity)
    private estudianteRepo: Repository<EstudianteEntity>,

    @InjectRepository(InscripcionEntity)
    private inscripcionRepo: Repository<InscripcionEntity>,

    @InjectRepository(ActividadEntity)
    private actividadRepo: Repository<ActividadEntity>,
  ) {}

  async crearEstudiante(data: any): Promise<EstudianteEntity> {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.correo)) throw new BadRequestException('Correo inválido');
    if (data.semestre < 1 || data.semestre > 10) throw new BadRequestException('Semestre fuera de rango');
    return this.estudianteRepo.save(data);
  }

  async findEstudianteById(id: number): Promise<EstudianteEntity> {
    const estudiante = await this.estudianteRepo.findOne({ where: { id } });
    if (!estudiante) throw new NotFoundException('Estudiante no encontrado');
    return estudiante;
  }

  async inscribirseActividad(estudianteId: number, actividadId: number): Promise<InscripcionEntity> {
    const estudiante = await this.findEstudianteById(estudianteId);
    const actividad = await this.actividadRepo.findOne({ where: { id: actividadId }, relations: ['actividades'] });
    if (!actividad) throw new NotFoundException('Actividad no encontrada');

    const inscritos = await this.inscripcionRepo.count({ where: { actividad: { id: actividadId } } });
    if (inscritos >= actividad.cupoMaximo) throw new BadRequestException('No hay cupo');
    if (actividad.estado !== 0) throw new BadRequestException('Actividad no abierta');

    const yaInscrito = await this.inscripcionRepo.findOne({
      where: {
        estudiante: { id: estudianteId },
        actividad: { id: actividadId }
      }
    });
    if (yaInscrito) throw new BadRequestException('Ya inscrito en esta actividad');

    const nuevaInscripcion = this.inscripcionRepo.create({
      estudiante,
      actividad,
      fechaInscripcion: new Date().toISOString().split('T')[0],
    });
    return this.inscripcionRepo.save(nuevaInscripcion);
  }
}