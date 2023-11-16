import { Test, TestingModule } from '@nestjs/testing';
import { CuentasPorPagarService } from './cuentas-por-pagar.service';

describe('CuentasPorPagarService', () => {
  let service: CuentasPorPagarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CuentasPorPagarService],
    }).compile();

    service = module.get<CuentasPorPagarService>(CuentasPorPagarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
