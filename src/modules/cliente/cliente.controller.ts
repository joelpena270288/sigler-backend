import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { HasRoles } from '../role/roles.decorator';
import { RoleEnum } from '../role/enums/role.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../role/guards/roles.guard';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}
  @HasRoles(
    RoleEnum.ADMIN,
    
    RoleEnum.FACTURADOR,
  
  )
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clienteService.create(createClienteDto);
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
    return this.clienteService.findAll();
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
    return this.clienteService.findOne(id);
  }
  @HasRoles(
    RoleEnum.ADMIN,
    RoleEnum.DIGITADOR,
    RoleEnum.FACTURADOR,
    RoleEnum.RH,
  )
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clienteService.update(id, updateClienteDto);
  }
  @HasRoles(
    RoleEnum.ADMIN,
   
    RoleEnum.FACTURADOR,
   
  )
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clienteService.remove(id);
  }
}
