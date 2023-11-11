import { PartialType } from '@nestjs/swagger';
import { CreateEstadosGastoDto } from './create-estados_gasto.dto';

export class UpdateEstadosGastoDto extends PartialType(CreateEstadosGastoDto) {}
