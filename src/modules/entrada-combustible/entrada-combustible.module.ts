import { Module } from '@nestjs/common';
import { EntradaCombustibleService } from './entrada-combustible.service';
import { EntradaCombustibleController } from './entrada-combustible.controller';
import { DatabaseModule } from '../../database/database.module';
import { CombustibleProviders } from '../combustible/combustible.providers';
import { EntradaCombustibleProviders } from './entrada_combustible.providers';
@Module({
  imports: [DatabaseModule],
  controllers: [EntradaCombustibleController],
  providers: [EntradaCombustibleService, ...CombustibleProviders, ...EntradaCombustibleProviders],
  exports: [EntradaCombustibleService]
})
export class EntradaCombustibleModule {}
