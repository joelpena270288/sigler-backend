import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CuentasEmpresaService } from './cuentas-empresa.service';
import { CreateCuentasEmpresaDto } from './dto/create-cuentas-empresa.dto';
import { UpdateCuentasEmpresaDto } from './dto/update-cuentas-empresa.dto';

@Controller('cuentas-empresa')
export class CuentasEmpresaController {
  constructor(private readonly cuentasEmpresaService: CuentasEmpresaService) {}

  @Post()
  create(@Body() createCuentasEmpresaDto: CreateCuentasEmpresaDto) {
    return this.cuentasEmpresaService.create(createCuentasEmpresaDto);
  }

  @Get()
  findAll() {
    return this.cuentasEmpresaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cuentasEmpresaService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCuentasEmpresaDto: UpdateCuentasEmpresaDto) {
    return this.cuentasEmpresaService.update(id, updateCuentasEmpresaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cuentasEmpresaService.remove(id);
  }
}
