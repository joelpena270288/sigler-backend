import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { GastosEmpresasService } from './gastos_empresas.service';
import { CreateGastosEmpresaDto } from './dto/create-gastos_empresa.dto';
import { UpdateGastosEmpresaDto } from './dto/update-gastos_empresa.dto';
import { HasRoles } from '../role/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../role/guards/roles.guard';
import { RoleEnum } from '../role/enums/role.enum';
import { FiltroFechaDto } from './dto/filtro-fecha.dto';
import { DescuentoGastosEmpresaDto } from './dto/descuento-gastos_empresa.dto';

@Controller('gastos-empresas')
export class GastosEmpresasController {
  constructor(private readonly gastosEmpresasService: GastosEmpresasService) {}
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createGastosEmpresaDto: CreateGastosEmpresaDto) {
    return this.gastosEmpresasService.create(createGastosEmpresaDto);
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR,RoleEnum.DIGITADOR,RoleEnum.RH)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.gastosEmpresasService.findAll();
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR,RoleEnum.DIGITADOR,RoleEnum.RH)
  @UseGuards(JwtAuthGuard, RolesGuard)
   @Get('/getCuentasporPagar')
  findAllCuentaPorPagar() {
    return this.gastosEmpresasService.findAllCuentasPorPagar();
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR,RoleEnum.DIGITADOR,RoleEnum.RH)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/getCuentasporPagar/:id')
  findAllCuentaPorPagarByIdProvedor(@Param('id') id: string) {
    return this.gastosEmpresasService.findAllCuentasPorPagarByIdProvedor(id);
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR,RoleEnum.DIGITADOR,RoleEnum.RH)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gastosEmpresasService.findOne(id);
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGastosEmpresaDto: UpdateGastosEmpresaDto) {
    return this.gastosEmpresasService.update(+id, updateGastosEmpresaDto);
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gastosEmpresasService.remove(id);
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/Byfilter/:id')
  findAllGastoByFilter(@Param('id') id: string,@Body() filtro: FiltroFechaDto) {
    return this.gastosEmpresasService.findAllGastoByFilter(id,filtro);
  }
  @HasRoles(RoleEnum.ADMIN,RoleEnum.ADMINISTRATIVO,RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('/descuento/:id')
  descuento(@Param('id') id: string, @Body() descuentoGastosEmpresaDto: DescuentoGastosEmpresaDto) {
    return this.gastosEmpresasService.descuento(id, descuentoGastosEmpresaDto);
  }
}
