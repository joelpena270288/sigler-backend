import { Test, TestingModule } from '@nestjs/testing';
import { CuentasPorPagarController } from './cuentas-por-pagar.controller';
import { CuentasPorPagarService } from './cuentas-por-pagar.service';

describe('CuentasPorPagarController', () => {
  let controller: CuentasPorPagarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CuentasPorPagarController],
      providers: [CuentasPorPagarService],
    }).compile();

    controller = module.get<CuentasPorPagarController>(CuentasPorPagarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
