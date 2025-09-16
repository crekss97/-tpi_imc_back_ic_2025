import { Injectable } from '@nestjs/common';
import { CalcularImcDto } from './dto/calcular-imc-dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ImcService {
  constructor(private prisma: PrismaService) {}

  async calcularImc(
    data: CalcularImcDto,
    req: any,
  ): Promise<{ imc: number; categoria: string }> {
    const { altura, peso } = data;
    const imc = peso / (altura * altura);
    const imcRedondeado = Math.round(imc * 100) / 100; // Dos decimales

    let categoria: string;
    if (imc < 18.5) {
      categoria = 'Bajo peso';
    } else if (imc < 25) {
      categoria = 'Normal';
    } else if (imc < 30) {
      categoria = 'Sobrepeso';
    } else {
      categoria = 'Obeso';
    }

    await this.prisma.imc.create({
      data: {
        altura: data.altura,
        peso: data.peso,
        imc,
        categoria,
        user: {
          connect: { id: req.user.userId },
        },
      },
      include: { user: true },
    });

    return { imc: imcRedondeado, categoria };
  }
}
