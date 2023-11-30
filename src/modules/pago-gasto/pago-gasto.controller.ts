import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PagoGastoService } from './pago-gasto.service';
import { CreatePagoGastoDto } from './dto/create-pago-gasto.dto';
import { UpdatePagoGastoDto } from './dto/update-pago-gasto.dto';
import { HasRoles } from '../role/roles.decorator';
import { RoleEnum } from '../role/enums/role.enum';
import { RolesGuard } from '../role/guards/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('pago-gasto')
export class PagoGastoController {
  constructor(private readonly pagoGastoService: PagoGastoService) {}
  @HasRoles(RoleEnum.ADMIN, RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createPagoGastoDto: CreatePagoGastoDto) {
    return this.pagoGastoService.create(createPagoGastoDto);
  }

  @Get()
  findAll() {
    return this.pagoGastoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pagoGastoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePagoGastoDto: UpdatePagoGastoDto) {
    return this.pagoGastoService.update(id, updatePagoGastoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pagoGastoService.remove(id);
  }
}
