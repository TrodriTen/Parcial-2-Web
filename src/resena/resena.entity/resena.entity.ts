import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { EstudianteEntity } from '../../estudiante/estudiante.entity/estudiante.entity';
import { ActividadEntity } from '../../actividad/actividad.entity/actividad.entity';

@Entity()
export class ResenaEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  comentario: string;

  @Column('int')
  calificacion: number;

  @Column()
  fecha: string;

  @ManyToOne(() => EstudianteEntity, estudiante => estudiante.resenas)
  estudiante: EstudianteEntity;

  @ManyToOne(() => ActividadEntity, actividad => actividad.resenas)
  actividad: ActividadEntity;
}
