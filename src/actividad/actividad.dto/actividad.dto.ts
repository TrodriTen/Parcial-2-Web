import { IsInt, IsString, MinLength, Matches } from 'class-validator';

export class CrearActividadDTO {
  @IsString()
  @MinLength(15)
  @Matches(/^[a-zA-Z0-9 ]+$/)
  titulo: string;

  @IsString()
  fecha: string;

  @IsInt()
  cupoMaximo: number;
}

export class ActividadDTO extends CrearActividadDTO {
  @IsInt()
  id: number;

  @IsInt()
  estado: number;
}

export class CambiarEstadoDTO {
  @IsInt()
  estado: number;
}

export type ActividadesDTO = ActividadDTO[];