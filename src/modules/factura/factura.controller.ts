import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FacturaService } from './factura.service';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';
import { HasRoles } from '../role/roles.decorator';
import { RoleEnum } from '../role/enums/role.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../role/guards/roles.guard';
import { UpdateClientePrefacturaDto } from './dto/update-cliente-factura';
import { ConvertFacturaDto } from './dto/convert-factura.dto';

@Controller('factura')
export class FacturaController {
  constructor(private readonly facturaService: FacturaService) {}
 @HasRoles(RoleEnum.ADMIN,RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createFacturaDto: CreateFacturaDto) {
    return this.facturaService.create(createFacturaDto);
  }
 @HasRoles(RoleEnum.ADMIN,RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.facturaService.findAll();
  }
 @HasRoles(RoleEnum.ADMIN,RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.facturaService.findOne(id);
  }
 @HasRoles(RoleEnum.ADMIN,RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFacturaDto: UpdateFacturaDto) {
    return this.facturaService.update(id, updateFacturaDto);
  }

  @HasRoles(RoleEnum.ADMIN,RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('editClient/:id')
  editClient(@Param('id') id: string, @Body() updateFacturaDto: UpdateClientePrefacturaDto) {
    return this.facturaService.updateCliente(id,updateFacturaDto);
  }
 @HasRoles(RoleEnum.ADMIN,RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facturaService.remove(id);
  }
  @HasRoles(RoleEnum.ADMIN, RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/aprobar/:idFactura')
  aprobar(@Param('id') id: string){
  return this.facturaService.aprobar(id);

  }
   @HasRoles(RoleEnum.ADMIN, RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  
   @Patch('/b01/:id')
  b01(@Param('id') id: string, @Body() convertFacturaDto: ConvertFacturaDto) {
    return this.facturaService.tipob01(id, convertFacturaDto);
  }
   @HasRoles(RoleEnum.ADMIN, RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
   @Patch('/b02/:id')
  b02(@Param('id') id: string, @Body() convertFacturaDto: ConvertFacturaDto) {
    return this.facturaService.tipob02(id, convertFacturaDto);
  }
   @HasRoles(RoleEnum.ADMIN, RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch('/b14/:id')
  b14(@Param('id') id: string, @Body() convertFacturaDto: ConvertFacturaDto) {
    return this.facturaService.tipob14(id, convertFacturaDto);
  }
 
}
