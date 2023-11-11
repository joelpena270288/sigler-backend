import { Test, TestingModule } from '@nestjs/testing';
import { EstadosGastosController } from './estados_gastos.controller';
import { EstadosGastosService } from './estados_gastos.service';

describe('EstadosGastosController', () => {
  let controller: EstadosGastosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstadosGastosController],
      providers: [EstadosGastosService],
    }).compile();

    controller = module.get<EstadosGastosController>(EstadosGastosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
