import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import { HasRoles } from '../role/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../role/guards/roles.guard';
import { RoleEnum } from '../role/enums/role.enum';

@Controller('proyecto')
export class ProyectoController {
  constructor(private readonly proyectoService: ProyectoService) {}
  @HasRoles(
    RoleEnum.ADMIN,   
    RoleEnum.FACTURADOR,  
  )
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createProyectoDto: CreateProyectoDto) {
    return this.proyectoService.create(createProyectoDto);
  }
  @HasRoles(
    RoleEnum.ADMIN,
    RoleEnum.DIGITADOR,
    RoleEnum.FACTURADOR,
    RoleEnum.RH,
  )
  @UseGuards(JwtAuthGuard, RolesGuard)

  @Get()
  findAll() {
    return this.proyectoService.findAll();
  }
  @HasRoles(
    RoleEnum.ADMIN,
    RoleEnum.DIGITADOR,
    RoleEnum.FACTURADOR,
    RoleEnum.RH,
  )
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proyectoService.findOne(id);
  }
  @HasRoles(
    RoleEnum.ADMIN,
 
    RoleEnum.FACTURADOR,
  
  )
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProyectoDto: UpdateProyectoDto) {
    return this.proyectoService.update(id, updateProyectoDto);
  }
  @HasRoles(
    RoleEnum.ADMIN,   
    RoleEnum.FACTURADOR,
   
  )
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.proyectoService.remove(id);
  }
  @HasRoles(
    RoleEnum.ADMIN,
    RoleEnum.DIGITADOR,
    RoleEnum.FACTURADOR,
    RoleEnum.RH,
  )
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/aprobar/:id')
  aprobar(@Param('id') id: string) {
    return this.proyectoService.aprobar(id);
  }
  @HasRoles(
    RoleEnum.ADMIN,
    RoleEnum.DIGITADOR,
    RoleEnum.FACTURADOR,
    RoleEnum.RH,
  )
  @UseGuards(JwtAuthGuard, RolesGuard)

  @Get('/aprobados/conduce/')
  aprobados() {
    return this.proyectoService.getProyectosAprobados();
  }

 
}
