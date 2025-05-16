import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActividadEntity } from './actividad.entity/actividad.entity';
import { ActividadService } from './actividad.service';
import { InscripcionEntity } from '../inscripcion/inscripcion.entity/inscripcion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ActividadEntity, InscripcionEntity])
  ],
  providers: [ActividadService],
  exports: [ActividadService],
})
export class ActividadModule {}
