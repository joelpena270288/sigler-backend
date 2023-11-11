import { PartialType } from '@nestjs/swagger';
import { CreateGastosProyectoDto } from './create-gastos_proyecto.dto';

export class UpdateGastosProyectoDto extends PartialType(CreateGastosProyectoDto) {}
