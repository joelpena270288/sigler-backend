import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstadoFacturaService } from './estado_factura.service';
import { CreateEstadoFacturaDto } from './dto/create-estado_factura.dto';
import { UpdateEstadoFacturaDto } from './dto/update-estado_factura.dto';

@Controller('estado-factura')
export class EstadoFacturaController {
  constructor(private readonly estadoFacturaService: EstadoFacturaService) {}

  @Post()
  create(@Body() createEstadoFacturaDto: CreateEstadoFacturaDto) {
    return this.estadoFacturaService.create(createEstadoFacturaDto);
  }

  @Get()
  findAll() {
    return this.estadoFacturaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estadoFacturaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstadoFacturaDto: UpdateEstadoFacturaDto) {
    return this.estadoFacturaService.update(+id, updateEstadoFacturaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estadoFacturaService.remove(+id);
  }
}
