import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

    // 1. Validar que el peso sea un número positivo mayor a 0 y menor a 500 kg.
    if (peso < 0 || peso > 500) {
      throw new HttpException(
        'El peso debe ser positivo no mayor a 500kg',
        HttpStatus.NOT_FOUND,
      );
    }
    // 2. Validar que la altura sea un número positivo mayor a 0 y menor a 3 metros.
    if (altura < 0 || altura > 3) {
      throw new HttpException(
        'La altura debe ser positiva y menor a 3 metros',
        HttpStatus.NOT_FOUND,
      );
    }

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

  async traerHistorial(req: any) {
    const userId = req.user.userId;

    const historial = await this.prisma.imc.findMany({
      where: { userId: userId },
    });

    if (historial.length === 0) return 'No tiene imc calculado';

    return historial;
  }
}
