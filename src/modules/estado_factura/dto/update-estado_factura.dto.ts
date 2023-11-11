import { PartialType } from '@nestjs/swagger';
import { CreateEstadoFacturaDto } from './create-estado_factura.dto';

export class UpdateEstadoFacturaDto extends PartialType(CreateEstadoFacturaDto) {}
