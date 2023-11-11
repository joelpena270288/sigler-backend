import { Injectable } from '@nestjs/common';
import { CreateGastosEmpresaDto } from './dto/create-gastos_empresa.dto';
import { UpdateGastosEmpresaDto } from './dto/update-gastos_empresa.dto';

@Injectable()
export class GastosEmpresasService {
  create(createGastosEmpresaDto: CreateGastosEmpresaDto) {
    return 'This action adds a new gastosEmpresa';
  }

  findAll() {
    return `This action returns all gastosEmpresas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gastosEmpresa`;
  }

  update(id: number, updateGastosEmpresaDto: UpdateGastosEmpresaDto) {
    return `This action updates a #${id} gastosEmpresa`;
  }

  remove(id: number) {
    return `This action removes a #${id} gastosEmpresa`;
  }
}
