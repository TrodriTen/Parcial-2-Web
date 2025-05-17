import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EstudianteModule } from './estudiante/estudiante.module';
import { ActividadModule } from './actividad/actividad.module';
import { ResenaModule } from './resena/resena.module';

import { EstudianteEntity } from './estudiante/estudiante.entity/estudiante.entity';
import { ActividadEntity } from './actividad/actividad.entity/actividad.entity';
import { ResenaEntity } from './resena/resena.entity/resena.entity';
import { InscripcionEntity } from './inscripcion/inscripcion.entity/inscripcion.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '200511020Tr$',
      database: 'parcial2',
      entities: [
        EstudianteEntity,
        ActividadEntity,
        ResenaEntity,
        InscripcionEntity,
      ],
      dropSchema: true,
      synchronize: true,
    }),
    EstudianteModule,
    ActividadModule,
    ResenaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
