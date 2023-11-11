import { Module } from '@nestjs/common';
import { GastosEmpresasService } from './gastos_empresas.service';
import { GastosEmpresasController } from './gastos_empresas.controller';

@Module({
  controllers: [GastosEmpresasController],
  providers: [GastosEmpresasService],
})
export class GastosEmpresasModule {}
