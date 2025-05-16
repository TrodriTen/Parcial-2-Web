import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { EstudianteEntity } from 'src/estudiante/estudiante.entity/estudiante.entity';
import { ActividadEntity } from 'src/actividad/actividad.entity/actividad.entity';

@Entity()
export class InscripcionEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => EstudianteEntity, estudiante => estudiante.inscritos)
  estudiante: EstudianteEntity;

  @ManyToOne(() => ActividadEntity, actividad => actividad.actividades)
  actividad: ActividadEntity;

  @Column()
  fechaInscripcion: string;
}
