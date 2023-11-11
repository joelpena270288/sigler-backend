import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServicioProcesadoService } from './servicio-procesado.service';
import { CreateServicioProcesadoDto } from './dto/create-servicio-procesado.dto';
import { UpdateServicioProcesadoDto } from './dto/update-servicio-procesado.dto';

@Controller('servicio-procesado')
export class ServicioProcesadoController {
  constructor(private readonly servicioProcesadoService: ServicioProcesadoService) {}

  @Post()
  create(@Body() createServicioProcesadoDto: CreateServicioProcesadoDto) {
    return this.servicioProcesadoService.create(createServicioProcesadoDto);
  }

  @Get()
  findAll() {
    return this.servicioProcesadoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicioProcesadoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServicioProcesadoDto: UpdateServicioProcesadoDto) {
    return this.servicioProcesadoService.update(id, updateServicioProcesadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicioProcesadoService.remove(id);
  }
}
