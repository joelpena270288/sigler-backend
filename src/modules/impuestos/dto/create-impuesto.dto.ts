import { IsString, IsInt, IsDate, IsDecimal } from 'class-validator';
export class CreateImpuestoDto {
    @IsString()
    name: string;
    @IsString()
    descripcion: string;
    @IsDecimal()
    valor: number;
}
