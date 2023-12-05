import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PiezasService } from './piezas.service';
import { CreatePiezaDto } from './dto/create-pieza.dto';
import { UpdatePiezaDto } from './dto/update-pieza.dto';
import { HasRoles, HasRoles } from '../role/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('piezas')
export class PiezasController {
  constructor(private readonly piezasService: PiezasService) {}
  @HasRoles(
    RoleEnum.ADMIN,
    RoleEnum.DIGITADOR,
    RoleEnum.FACTURADOR
   
  )
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createPiezaDto: CreatePiezaDto) {
    return this.piezasService.create(createPiezaDto);
  }
  @HasRoles(
    RoleEnum.ADMIN,
    RoleEnum.DIGITADOR,
    RoleEnum.FACTURADOR
   
  )
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.piezasService.findAll();
  }
  @HasRoles(
    RoleEnum.ADMIN,
    RoleEnum.DIGITADOR,
    RoleEnum.FACTURADOR
   
  )
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.piezasService.findOne(id);
  }
  @HasRoles(
    RoleEnum.ADMIN,
    RoleEnum.DIGITADOR,
    RoleEnum.FACTURADOR
   
  )
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePiezaDto: UpdatePiezaDto) {
    return this.piezasService.update(id, updatePiezaDto);
  }
  @HasRoles(
    RoleEnum.ADMIN,
    RoleEnum.DIGITADOR,
    RoleEnum.FACTURADOR
   
  )
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.piezasService.remove(id);
  }
}
