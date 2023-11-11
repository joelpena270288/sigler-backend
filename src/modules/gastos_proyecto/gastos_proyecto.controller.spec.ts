import { Test, TestingModule } from '@nestjs/testing';
import { GastosProyectoController } from './gastos_proyecto.controller';
import { GastosProyectoService } from './gastos_proyecto.service';

describe('GastosProyectoController', () => {
  let controller: GastosProyectoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GastosProyectoController],
      providers: [GastosProyectoService],
    }).compile();

    controller = module.get<GastosProyectoController>(GastosProyectoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
