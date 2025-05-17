import { IsEmail, IsInt, IsString, Max, Min } from 'class-validator';

export class CrearEstudianteDTO {
  @IsInt()
  cedula: number;

  @IsString()
  nombre: string;

  @IsEmail()
  correo: string;

  @IsString()
  programa: string;

  @IsInt()
  @Min(1)
  @Max(10)
  semestre: number;
}

export class EstudianteDTO extends CrearEstudianteDTO {
  @IsInt()
  id: number;
}