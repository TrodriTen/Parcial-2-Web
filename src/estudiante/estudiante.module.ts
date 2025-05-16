import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteEntity } from './estudiante.entity/estudiante.entity';
import { EstudianteService } from './estudiante.service';
import { ActividadEntity } from '../actividad/actividad.entity/actividad.entity';
import { InscripcionEntity } from '../inscripcion/inscripcion.entity/inscripcion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EstudianteEntity, ActividadEntity, InscripcionEntity])
  ],
  providers: [EstudianteService],
  exports: [EstudianteService],
})
export class EstudianteModule {}
