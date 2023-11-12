import { Module } from '@nestjs/common';
import { FacturaService } from './factura.service';
import { FacturaController } from './factura.controller';
import { DatabaseModule } from '../../database/database.module';
import { FacturaProviders } from './factura.providers';
import {ProyectoProviders} from '../proyecto/proyecto.providers';
import { PreFacturaProviders } from '../pre-factura/pre-factura.providers';
import { ServicioProcesadoProviders } from '../servicio-procesado/servicio-procesado.providers';
import { ClienteProviders } from '../cliente/cliente.providers';
@Module({
	imports: [DatabaseModule],
  controllers: [FacturaController],
  providers: [FacturaService,...FacturaProviders,...ProyectoProviders,...ServicioProcesadoProviders,...PreFacturaProviders,...ClienteProviders],
  exports:[FacturaService]
})
export class FacturaModule {}
