import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteEntity } from './estudiante.entity/estudiante.entity';
import { EstudianteService } from './estudiante.service';
import { ActividadEntity } from '../actividad/actividad.entity/actividad.entity';
import { InscripcionEntity } from '../inscripcion/inscripcion.entity/inscripcion.entity';
import { EstudianteController } from './estudiante.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([EstudianteEntity, ActividadEntity, InscripcionEntity])
  ],
  providers: [EstudianteService],
  exports: [EstudianteService],
  controllers: [EstudianteController],
})
export class EstudianteModule {}
