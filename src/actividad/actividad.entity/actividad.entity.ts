import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ResenaEntity } from 'src/resena/resena.entity/resena.entity';
import { InscripcionEntity } from 'src/inscripcion/inscripcion.entity/inscripcion.entity';

@Entity()
export class ActividadEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  titulo: string;

  @Column()
  fecha: string;

  @Column('int')
  cupoMaximo: number;

  @Column('int')
  estado: number;

  @OneToMany(() => InscripcionEntity, inscripcion => inscripcion.actividad)
  actividades: InscripcionEntity[];

  @OneToMany(() => ResenaEntity, resena => resena.actividad)
  resenas: ResenaEntity[];
}
