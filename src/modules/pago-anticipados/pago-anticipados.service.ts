import { Injectable } from '@nestjs/common';
import { CreatePagoAnticipadoDto } from './dto/create-pago-anticipado.dto';
import { UpdatePagoAnticipadoDto } from './dto/update-pago-anticipado.dto';

@Injectable()
export class PagoAnticipadosService {
  create(createPagoAnticipadoDto: CreatePagoAnticipadoDto) {
    return 'This action adds a new pagoAnticipado';
  }

  findAll() {
    return `This action returns all pagoAnticipados`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pagoAnticipado`;
  }

  update(id: number, updatePagoAnticipadoDto: UpdatePagoAnticipadoDto) {
    return `This action updates a #${id} pagoAnticipado`;
  }

  remove(id: number) {
    return `This action removes a #${id} pagoAnticipado`;
  }
}
