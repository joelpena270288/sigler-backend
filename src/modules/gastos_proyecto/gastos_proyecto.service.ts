import { Injectable } from '@nestjs/common';
import { CreateGastosProyectoDto } from './dto/create-gastos_proyecto.dto';
import { UpdateGastosProyectoDto } from './dto/update-gastos_proyecto.dto';

@Injectable()
export class GastosProyectoService {
  create(createGastosProyectoDto: CreateGastosProyectoDto) {
    return 'This action adds a new gastosProyecto';
  }

  findAll() {
    return `This action returns all gastosProyecto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gastosProyecto`;
  }

  update(id: number, updateGastosProyectoDto: UpdateGastosProyectoDto) {
    return `This action updates a #${id} gastosProyecto`;
  }

  remove(id: number) {
    return `This action removes a #${id} gastosProyecto`;
  }
}
