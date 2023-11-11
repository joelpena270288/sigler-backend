import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstadosGastosService } from './estados_gastos.service';
import { CreateEstadosGastoDto } from './dto/create-estados_gasto.dto';
import { UpdateEstadosGastoDto } from './dto/update-estados_gasto.dto';

@Controller('estados-gastos')
export class EstadosGastosController {
  constructor(private readonly estadosGastosService: EstadosGastosService) {}

  @Post()
  create(@Body() createEstadosGastoDto: CreateEstadosGastoDto) {
    return this.estadosGastosService.create(createEstadosGastoDto);
  }

  @Get()
  findAll() {
    return this.estadosGastosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estadosGastosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstadosGastoDto: UpdateEstadosGastoDto) {
    return this.estadosGastosService.update(+id, updateEstadosGastoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estadosGastosService.remove(+id);
  }
}
