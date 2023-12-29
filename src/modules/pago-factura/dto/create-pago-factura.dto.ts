import { IsString, IsDecimal, IsNotEmpty } from "class-validator";
export class CreatePagoFacturaDto {
    @IsNotEmpty()
idcuenta: string;
@IsNotEmpty()
idfactura: string;
@IsDecimal()
pago: number;

numerocheque: string;

}
