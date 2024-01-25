import { Module } from '@nestjs/common';
import { RetencionService } from './retencion.service';
import { RetencionController } from './retencion.controller';
import { DatabaseModule } from '../../database/database.module';
import { RetencionProviders } from './retencion.providers';
import { GastoEmpresaProviders } from '../gastos_empresas/gastos_empresas.providers';
@Module({
  imports: [DatabaseModule],
  controllers: [RetencionController],
  providers: [RetencionService,...RetencionProviders,...GastoEmpresaProviders],
  exports: [RetencionService],
})
export class RetencionModule {}
