import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PreFacturaService } from './pre-factura.service';
import { CreatePreFacturaDto } from './dto/create-pre-factura.dto';
import { UpdatePreFacturaDto } from './dto/update-pre-factura.dto';
import { HasRoles } from '../role/roles.decorator';
import { RoleEnum } from '../role/enums/role.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../role/guards/roles.guard';

@Controller('pre-factura')
export class PreFacturaController {
  constructor(private readonly preFacturaService: PreFacturaService) {}

  @Post()
  create(@Body() createPreFacturaDto: CreatePreFacturaDto) {
    return this.preFacturaService.create(createPreFacturaDto);
  }

  @Get()
  findAll() {
    return this.preFacturaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.preFacturaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePreFacturaDto: UpdatePreFacturaDto) {
    return this.preFacturaService.update(+id, updatePreFacturaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.preFacturaService.remove(+id);
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/ByIdProyecto/:id')
  findByIdProyecto(@Param('id') id: string) {
    return this.preFacturaService.findByIdProyecto(id);
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/ByIdProyecto/Activa:id')
  findByIdProyectoActiva(@Param('id') id: string) {
    return this.preFacturaService.findByIdProyecto(id);
  }
}
