import { Injectable } from '@nestjs/common';
import { CreateCuentasPorPagarDto } from './dto/create-cuentas-por-pagar.dto';
import { UpdateCuentasPorPagarDto } from './dto/update-cuentas-por-pagar.dto';

@Injectable()
export class CuentasPorPagarService {
  create(createCuentasPorPagarDto: CreateCuentasPorPagarDto) {
    return 'This action adds a new cuentasPorPagar';
  }

  findAll() {
    return `This action returns all cuentasPorPagar`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cuentasPorPagar`;
  }

  update(id: number, updateCuentasPorPagarDto: UpdateCuentasPorPagarDto) {
    return `This action updates a #${id} cuentasPorPagar`;
  }

  remove(id: number) {
    return `This action removes a #${id} cuentasPorPagar`;
  }
}
