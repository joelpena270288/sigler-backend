import { Test, TestingModule } from '@nestjs/testing';
import { EstadoFacturaController } from './estado_factura.controller';
import { EstadoFacturaService } from './estado_factura.service';

describe('EstadoFacturaController', () => {
  let controller: EstadoFacturaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstadoFacturaController],
      providers: [EstadoFacturaService],
    }).compile();

    controller = module.get<EstadoFacturaController>(EstadoFacturaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
