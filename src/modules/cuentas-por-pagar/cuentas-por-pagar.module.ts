import { Module } from '@nestjs/common';
import { CuentasPorPagarService } from './cuentas-por-pagar.service';
import { CuentasPorPagarController } from './cuentas-por-pagar.controller';

@Module({
  controllers: [CuentasPorPagarController],
  providers: [CuentasPorPagarService],
})
export class CuentasPorPagarModule {}
