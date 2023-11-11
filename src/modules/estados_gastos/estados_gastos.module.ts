import { Module } from '@nestjs/common';
import { EstadosGastosService } from './estados_gastos.service';
import { EstadosGastosController } from './estados_gastos.controller';

@Module({
  controllers: [EstadosGastosController],
  providers: [EstadosGastosService],
})
export class EstadosGastosModule {}
