import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GastosProyectoService } from './gastos_proyecto.service';
import { CreateGastosProyectoDto } from './dto/create-gastos_proyecto.dto';
import { UpdateGastosProyectoDto } from './dto/update-gastos_proyecto.dto';

@Controller('gastos-proyecto')
export class GastosProyectoController {
  constructor(private readonly gastosProyectoService: GastosProyectoService) {}

  @Post()
  create(@Body() createGastosProyectoDto: CreateGastosProyectoDto) {
    return this.gastosProyectoService.create(createGastosProyectoDto);
  }

  @Get()
  findAll() {
    return this.gastosProyectoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gastosProyectoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGastosProyectoDto: UpdateGastosProyectoDto) {
    return this.gastosProyectoService.update(+id, updateGastosProyectoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gastosProyectoService.remove(+id);
  }
}
