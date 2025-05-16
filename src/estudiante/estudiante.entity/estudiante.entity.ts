import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ResenaEntity } from 'src/resena/resena.entity/resena.entity';
import { InscripcionEntity } from 'src/inscripcion/inscripcion.entity/inscripcion.entity';

@Entity()
export class EstudianteEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('int')
  cedula: number;

  @Column()
  nombre: string;

  @Column()
  correo: string;

  @Column()
  programa: string;

  @Column('int')
  semestre: number;

  @OneToMany(() => InscripcionEntity, inscripcion => inscripcion.estudiante)
  inscritos: InscripcionEntity[];

  @OneToMany(() => ResenaEntity, resena => resena.estudiante)
  resenas: ResenaEntity[];
}
