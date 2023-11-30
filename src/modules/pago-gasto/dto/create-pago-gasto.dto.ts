import { IsString, IsDecimal } from "class-validator";
export class CreatePagoGastoDto {
    @IsString()
    idcuenta: string;
    @IsString()
    idgasto: string;
    @IsDecimal()
    pago: number;
    @IsString()
    numerocheque: string;

}
