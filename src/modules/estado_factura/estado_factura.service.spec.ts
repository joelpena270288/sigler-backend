import { Test, TestingModule } from '@nestjs/testing';
import { EstadoFacturaService } from './estado_factura.service';

describe('EstadoFacturaService', () => {
  let service: EstadoFacturaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstadoFacturaService],
    }).compile();

    service = module.get<EstadoFacturaService>(EstadoFacturaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
