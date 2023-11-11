import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ConduceProcezadoService } from './conduce-procezado.service';
import { CreateConduceProcezadoDto } from './dto/create-conduce-procezado.dto';
import { UpdateConduceProcezadoDto } from './dto/update-conduce-procezado.dto';
import { HasRoles } from '../role/roles.decorator';
import { RoleEnum } from '../role/enums/role.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../role/guards/roles.guard';

@Controller('conduce-procezado')
export class ConduceProcezadoController {
  constructor(private readonly conduceProcezadoService: ConduceProcezadoService) {}
  @HasRoles(RoleEnum.ADMIN, RoleEnum.FACTURADOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createConduceProcezadoDto: CreateConduceProcezadoDto) {
    return this.conduceProcezadoService.create(createConduceProcezadoDto);
  }

  @Get()
  findAll() {
    return this.conduceProcezadoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.conduceProcezadoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConduceProcezadoDto: UpdateConduceProcezadoDto) {
    return this.conduceProcezadoService.update(id, updateConduceProcezadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conduceProcezadoService.remove(+id);
  }
}
