import { IsEmail, IsInt, IsString, Max, Min } from 'class-validator';
export class InscribirActividadDTO {
  @IsInt()
  actividadId: number;
}

export class InscripcionDTO {
  @IsInt()
  estudianteId: number;

  @IsInt()
  actividadId: number;

  @IsString()
  fechaInscripcion: string;
}