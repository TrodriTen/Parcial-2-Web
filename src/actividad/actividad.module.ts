import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActividadEntity } from './actividad.entity/actividad.entity';
import { ActividadService } from './actividad.service';
import { InscripcionEntity } from '../inscripcion/inscripcion.entity/inscripcion.entity';
import { ActividadController } from './actividad.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ActividadEntity, InscripcionEntity])
  ],
  providers: [ActividadService],
  exports: [ActividadService],
  controllers: [ActividadController],
})
export class ActividadModule {}
