import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Request,
  Get,
  UseGuards,
} from '@nestjs/common';
import { ImcService } from './imc.service';
import { CalcularImcDto } from './dto/calcular-imc-dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('imc')
export class ImcController {
  constructor(private readonly imcService: ImcService) {}

  @UseGuards(JwtAuthGuard)
  @Post('calcular')
  calcular(@Body(ValidationPipe) data: CalcularImcDto, @Request() req) {
    return this.imcService.calcularImc(data, req);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  traerHistorial(@Request() req) {
    return this.imcService.traerHistorial(req);
  }
}
