import { IsInt, IsString, Max, Min } from 'class-validator';

export class CrearResenaDTO {
  @IsString()
  comentario: string;

  @IsInt()
  @Min(0)
  @Max(5)
  calificacion: number;

  @IsString()
  fecha: string;

  @IsInt()
  estudianteId: number;

  @IsInt()
  actividadId: number;
}

export class ResenaDTO extends CrearResenaDTO {
  @IsInt()
  id: number;
}
