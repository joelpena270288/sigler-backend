import { Injectable } from '@nestjs/common';
import { CreateConsumoCombustibleDto } from './dto/create-consumo_combustible.dto';
import { UpdateConsumoCombustibleDto } from './dto/update-consumo_combustible.dto';

@Injectable()
export class ConsumoCombustibleService {
  create(createConsumoCombustibleDto: CreateConsumoCombustibleDto) {
    return 'This action adds a new consumoCombustible';
  }

  findAll() {
    return `This action returns all consumoCombustible`;
  }

  findOne(id: number) {
    return `This action returns a #${id} consumoCombustible`;
  }

  update(id: number, updateConsumoCombustibleDto: UpdateConsumoCombustibleDto) {
    return `This action updates a #${id} consumoCombustible`;
  }

  remove(id: number) {
    return `This action removes a #${id} consumoCombustible`;
  }
}
