import { Module } from '@nestjs/common';
import { TipoImpuestosDgiService } from './tipo_impuestos_dgi.service';
import { TipoImpuestosDgiController } from './tipo_impuestos_dgi.controller';
import { DatabaseModule } from '../../database/database.module';
import { TipoImpuestoDgiImpuestoProviders } from './tipo_impuesto_dgi.providers';
@Module({
  imports: [DatabaseModule],
  controllers: [TipoImpuestosDgiController],
  providers: [TipoImpuestosDgiService,...TipoImpuestoDgiImpuestoProviders],
  exports:[TipoImpuestosDgiService]
})
export class TipoImpuestosDgiModule {}
