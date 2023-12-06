import { Module } from '@nestjs/common';
import { ReportGastoService } from './report-gasto.service';
import { ReportGastoController } from './report-gasto.controller';
import { GastoEmpresaProviders } from '../gastos_empresas/gastos_empresas.providers';
import { ConsumoCombustibleProviders } from '../consumo_combustible/consumo_combustible.providers';

@Module({
  controllers: [ReportGastoController],
  providers: [ReportGastoService,...GastoEmpresaProviders,...ConsumoCombustibleProviders],
  exports:[ReportGastoService],
})
export class ReportGastoModule {}