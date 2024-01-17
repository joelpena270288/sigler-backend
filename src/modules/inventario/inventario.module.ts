import { Module } from '@nestjs/common';
import { InventarioService } from './inventario.service';
import { InventarioController } from './inventario.controller';
import { DatabaseModule } from '../../database/database.module';
import { InventarioProviders } from './inventario.providers';
import { EquipoProviders } from '../equipos/equipos.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [InventarioController],
  providers: [InventarioService],
  exports: [InventarioService,...InventarioProviders,...EquipoProviders],
})
export class InventarioModule {}
