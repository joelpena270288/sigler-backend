import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GastoItemService } from './gasto_item.service';
import { CreateGastoItemDto } from './dto/create-gasto_item.dto';
import { UpdateGastoItemDto } from './dto/update-gasto_item.dto';

@Controller('gasto-item')
export class GastoItemController {
  constructor(private readonly gastoItemService: GastoItemService) {}

  @Post()
  create(@Body() createGastoItemDto: CreateGastoItemDto) {
    return this.gastoItemService.create(createGastoItemDto);
  }

  @Get()
  findAll() {
    return this.gastoItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gastoItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGastoItemDto: UpdateGastoItemDto) {
    return this.gastoItemService.update(+id, updateGastoItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gastoItemService.remove(+id);
  }
}
