import { Module } from '@nestjs/common';
import { Report06Service } from './report-06.service';
import { Report06Controller } from './report-06.controller';
import { DatabaseModule } from '../../database/database.module';

import { GastoEmpresaProviders } from '../gastos_empresas/gastos_empresas.providers';
@Module({
  imports: [DatabaseModule],
  controllers: [Report06Controller],
  providers: [Report06Service,...GastoEmpresaProviders],
  exports: [Report06Service],
})
export class Report06Module {}
