import { IsString, IsDecimal } from "class-validator";
export class CreatePagoFacturaDto {
@IsString()
idcuenta: string;
@IsString()
idfactura: string;
@IsDecimal()
pago: number;
@IsString()
numerocheque: string;

}
