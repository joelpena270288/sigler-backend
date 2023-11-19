import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PagoAnticipadosService } from './pago-anticipados.service';
import { CreatePagoAnticipadoDto } from './dto/create-pago-anticipado.dto';
import { UpdatePagoAnticipadoDto } from './dto/update-pago-anticipado.dto';

@Controller('pago-anticipados')
export class PagoAnticipadosController {
  constructor(private readonly pagoAnticipadosService: PagoAnticipadosService) {}

  @Post()
  create(@Body() createPagoAnticipadoDto: CreatePagoAnticipadoDto) {
    return this.pagoAnticipadosService.create(createPagoAnticipadoDto);
  }

  @Get()
  findAll() {
    return this.pagoAnticipadosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pagoAnticipadosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePagoAnticipadoDto: UpdatePagoAnticipadoDto) {
    return this.pagoAnticipadosService.update(+id, updatePagoAnticipadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pagoAnticipadosService.remove(+id);
  }
}
