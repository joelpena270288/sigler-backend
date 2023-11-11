import { Module } from '@nestjs/common';
import { GastosProyectoService } from './gastos_proyecto.service';
import { GastosProyectoController } from './gastos_proyecto.controller';

@Module({
  controllers: [GastosProyectoController],
  providers: [GastosProyectoService],
})
export class GastosProyectoModule {}
