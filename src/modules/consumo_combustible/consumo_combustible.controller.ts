import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConsumoCombustibleService } from './consumo_combustible.service';
import { CreateConsumoCombustibleDto } from './dto/create-consumo_combustible.dto';
import { UpdateConsumoCombustibleDto } from './dto/update-consumo_combustible.dto';

@Controller('consumo-combustible')
export class ConsumoCombustibleController {
  constructor(private readonly consumoCombustibleService: ConsumoCombustibleService) {}

  @Post()
  create(@Body() createConsumoCombustibleDto: CreateConsumoCombustibleDto) {
    return this.consumoCombustibleService.create(createConsumoCombustibleDto);
  }

  @Get()
  findAll() {
    return this.consumoCombustibleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consumoCombustibleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConsumoCombustibleDto: UpdateConsumoCombustibleDto) {
    return this.consumoCombustibleService.update(+id, updateConsumoCombustibleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consumoCombustibleService.remove(+id);
  }
}
