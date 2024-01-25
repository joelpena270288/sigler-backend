import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RetencionService } from './retencion.service';
import { CreateRetencionDto } from './dto/create-retencion.dto';
import { UpdateRetencionDto } from './dto/update-retencion.dto';

@Controller('retencion')
export class RetencionController {
  constructor(private readonly retencionService: RetencionService) {}

  @Post()
  create(@Body() createRetencionDto: CreateRetencionDto) {
    return this.retencionService.create(createRetencionDto);
  }

  @Get()
  findAll() {
    return this.retencionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.retencionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRetencionDto: UpdateRetencionDto) {
    return this.retencionService.update(+id, updateRetencionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.retencionService.remove(+id);
  }
}
