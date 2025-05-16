import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResenaService } from './resena.service';
import { ResenaEntity } from './resena.entity/resena.entity';
import { ActividadEntity } from '../actividad/actividad.entity/actividad.entity';
import { EstudianteEntity } from '../estudiante/estudiante.entity/estudiante.entity';
import { InscripcionEntity } from '../inscripcion/inscripcion.entity/inscripcion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ResenaEntity,
      ActividadEntity,
      EstudianteEntity,
      InscripcionEntity,
    ]),
  ],
  providers: [ResenaService],
  exports: [ResenaService],
})
export class ResenaModule {}
