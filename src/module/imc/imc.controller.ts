import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Request,
  Get,
} from '@nestjs/common';
import { ImcService } from './imc.service';
import { CalcularImcDto } from './dto/calcular-imc-dto';

@Controller('imc')
export class ImcController {
  constructor(private readonly imcService: ImcService) {}

  @Post('calcular')
  calcular(@Body(ValidationPipe) data: CalcularImcDto, @Request() req) {
    return this.imcService.calcularImc(data, req);
  }

  @Get()
  traerHistorial(@Request() req) {
    return this.imcService.traerHistorial(req);
  }
}
