import { Injectable } from '@nestjs/common';
import { CreateEstadoFacturaDto } from './dto/create-estado_factura.dto';
import { UpdateEstadoFacturaDto } from './dto/update-estado_factura.dto';

@Injectable()
export class EstadoFacturaService {
  create(createEstadoFacturaDto: CreateEstadoFacturaDto) {
    return 'This action adds a new estadoFactura';
  }

  findAll() {
    return `This action returns all estadoFactura`;
  }

  findOne(id: number) {
    return `This action returns a #${id} estadoFactura`;
  }

  update(id: number, updateEstadoFacturaDto: UpdateEstadoFacturaDto) {
    return `This action updates a #${id} estadoFactura`;
  }

  remove(id: number) {
    return `This action removes a #${id} estadoFactura`;
  }
}
