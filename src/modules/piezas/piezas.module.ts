import { Module } from '@nestjs/common';
import { PiezasService } from './piezas.service';
import { PiezasController } from './piezas.controller';

@Module({
  controllers: [PiezasController],
  providers: [PiezasService],
})
export class PiezasModule {}
