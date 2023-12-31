import { Module } from '@nestjs/common';
import { GastosEmpresasService } from './gastos_empresas.service';
import { GastosEmpresasController } from './gastos_empresas.controller';
import { DatabaseModule } from '../../database/database.module';
import { GastoEmpresaProviders } from './gastos_empresas.providers';
import { ProyectoProviders } from '../proyecto/proyecto.providers';
import { GastoItemProviders } from '../gasto_item/gasto_item.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [
    GastosEmpresasController
   
  ],
  providers: [GastosEmpresasService, ...GastoEmpresaProviders,
    ...ProyectoProviders,...GastoItemProviders],
  exports: [GastosEmpresasService],
})
export class GastosEmpresasModule {}
