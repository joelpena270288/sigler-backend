import { Module } from '@nestjs/common';
import { InventarioService } from './inventario.service';
import { InventarioController } from './inventario.controller';
import { DatabaseModule } from '../../database/database.module';
import { InventarioProviders } from './inventario.providers';
import { EquiposService } from '../equipos/equipos.service';
@Module({
  imports: [DatabaseModule],
  controllers: [InventarioController],
  providers: [InventarioService],
  exports: [InventarioService,...InventarioProviders,...EquiposService],
})
export class InventarioModule {}
