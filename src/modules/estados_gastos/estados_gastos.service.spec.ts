import { Test, TestingModule } from '@nestjs/testing';
import { EstadosGastosService } from './estados_gastos.service';

describe('EstadosGastosService', () => {
  let service: EstadosGastosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstadosGastosService],
    }).compile();

    service = module.get<EstadosGastosService>(EstadosGastosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
