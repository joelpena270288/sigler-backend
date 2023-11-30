import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GastosEmpresasService } from './gastos_empresas.service';
import { CreateGastosEmpresaDto } from './dto/create-gastos_empresa.dto';
import { UpdateGastosEmpresaDto } from './dto/update-gastos_empresa.dto';

@Controller('gastos-empresas')
export class GastosEmpresasController {
  constructor(private readonly gastosEmpresasService: GastosEmpresasService) {}

  @Post()
  create(@Body() createGastosEmpresaDto: CreateGastosEmpresaDto) {
    return this.gastosEmpresasService.create(createGastosEmpresaDto);
  }

  @Get()
  findAll() {
    return this.gastosEmpresasService.findAll();
  }
  
   @Get('/getCuentasporPagar')
  findAllCuentaPorPagar() {
    return this.gastosEmpresasService.findAllCuentasPorPagar();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gastosEmpresasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGastosEmpresaDto: UpdateGastosEmpresaDto) {
    return this.gastosEmpresasService.update(+id, updateGastosEmpresaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gastosEmpresasService.remove(id);
  }
}
