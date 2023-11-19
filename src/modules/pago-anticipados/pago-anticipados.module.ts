import { Module } from '@nestjs/common';
import { PagoAnticipadosService } from './pago-anticipados.service';
import { PagoAnticipadosController } from './pago-anticipados.controller';
import { DatabaseModule } from '../../database/database.module';
import { PagoAnticipadoProviders } from './pago-anticipados.providers';
@Module({
  imports: [DatabaseModule],
  controllers: [PagoAnticipadosController],
  providers: [PagoAnticipadosService, ...PagoAnticipadoProviders],
  exports:[PagoAnticipadosService]
})
export class PagoAnticipadosModule {}
