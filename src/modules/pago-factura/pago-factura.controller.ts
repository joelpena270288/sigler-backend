import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PagoFacturaService } from './pago-factura.service';
import { CreatePagoFacturaDto } from './dto/create-pago-factura.dto';
import { UpdatePagoFacturaDto } from './dto/update-pago-factura.dto';
import { HasRoles } from '../role/roles.decorator';
import { RoleEnum } from '../role/enums/role.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../role/guards/roles.guard';

@Controller('pago-factura')
export class PagoFacturaController {
  constructor(private readonly pagoFacturaService: PagoFacturaService) {}
  @HasRoles(RoleEnum.ADMIN, RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createPagoFacturaDto: CreatePagoFacturaDto) {
    return this.pagoFacturaService.create(createPagoFacturaDto);
  }

  @Get()
  findAll() {
    return this.pagoFacturaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pagoFacturaService.findOne(+id);
  }
  @Get('/getbyidfactura/:id')
  findAllByIdFactura(@Param('id') id: string) {
    return this.pagoFacturaService.pagos(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePagoFacturaDto: UpdatePagoFacturaDto) {
    return this.pagoFacturaService.update(+id, updatePagoFacturaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pagoFacturaService.remove(+id);
  }
}
