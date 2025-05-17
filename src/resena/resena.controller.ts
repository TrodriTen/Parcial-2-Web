import { Controller, Post, Body } from '@nestjs/common';
import { ResenaService } from './resena.service';
import { CrearResenaDTO, ResenaDTO } from './resena.dto/resena.dto';

@Controller('resena')
export class ResenaController {
  constructor(private readonly resenaService: ResenaService) {}

  @Post()
  agregar(@Body() data: CrearResenaDTO): Promise<ResenaDTO> {
    return this.resenaService.agregarResena(data);
  }
}
