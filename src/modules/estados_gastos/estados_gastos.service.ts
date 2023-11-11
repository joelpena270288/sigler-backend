import { Injectable } from '@nestjs/common';
import { CreateEstadosGastoDto } from './dto/create-estados_gasto.dto';
import { UpdateEstadosGastoDto } from './dto/update-estados_gasto.dto';

@Injectable()
export class EstadosGastosService {
  create(createEstadosGastoDto: CreateEstadosGastoDto) {
    return 'This action adds a new estadosGasto';
  }

  findAll() {
    return `This action returns all estadosGastos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} estadosGasto`;
  }

  update(id: number, updateEstadosGastoDto: UpdateEstadosGastoDto) {
    return `This action updates a #${id} estadosGasto`;
  }

  remove(id: number) {
    return `This action removes a #${id} estadosGasto`;
  }
}
