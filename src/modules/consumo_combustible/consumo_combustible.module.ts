import { Module } from '@nestjs/common';
import { ConsumoCombustibleService } from './consumo_combustible.service';
import { ConsumoCombustibleController } from './consumo_combustible.controller';
import { DatabaseModule } from '../../database/database.module';
import { ConsumoCombustibleProviders } from './consumo_combustible.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ConsumoCombustibleController],
  providers: [ConsumoCombustibleService,...ConsumoCombustibleProviders],
  exports: [ConsumoCombustibleService],
})
export class ConsumoCombustibleModule {}
