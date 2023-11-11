import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PiezasService } from './piezas.service';
import { CreatePiezaDto } from './dto/create-pieza.dto';
import { UpdatePiezaDto } from './dto/update-pieza.dto';

@Controller('piezas')
export class PiezasController {
  constructor(private readonly piezasService: PiezasService) {}

  @Post()
  create(@Body() createPiezaDto: CreatePiezaDto) {
    return this.piezasService.create(createPiezaDto);
  }

  @Get()
  findAll() {
    return this.piezasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.piezasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePiezaDto: UpdatePiezaDto) {
    return this.piezasService.update(+id, updatePiezaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.piezasService.remove(+id);
  }
}
