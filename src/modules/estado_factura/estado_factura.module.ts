import { Module } from '@nestjs/common';
import { EstadoFacturaService } from './estado_factura.service';
import { EstadoFacturaController } from './estado_factura.controller';

@Module({
  controllers: [EstadoFacturaController],
  providers: [EstadoFacturaService],
})
export class EstadoFacturaModule {}
