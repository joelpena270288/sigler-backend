import { IsString, IsDecimal } from "class-validator";
export class CreatePagoAnticipadoDto {

    @IsString()
    idcuenta: string;
    @IsString()
    idcliente: string;
    @IsDecimal()
    pago: number;
    @IsString()
    numerocheque: string;
    @IsString()
    numeroTransferencia: string;
    
    }



