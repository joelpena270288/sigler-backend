import { PartialType } from '@nestjs/swagger';
import { CreateCuentasPorPagarDto } from './create-cuentas-por-pagar.dto';

export class UpdateCuentasPorPagarDto extends PartialType(CreateCuentasPorPagarDto) {}
