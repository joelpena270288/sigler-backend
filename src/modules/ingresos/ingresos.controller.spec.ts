import { Test, TestingModule } from '@nestjs/testing';
import { IngresosController } from './ingresos.controller';
import { IngresosService } from './ingresos.service';

describe('IngresosController', () => {
  let controller: IngresosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IngresosController],
      providers: [IngresosService],
    }).compile();

    controller = module.get<IngresosController>(IngresosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
