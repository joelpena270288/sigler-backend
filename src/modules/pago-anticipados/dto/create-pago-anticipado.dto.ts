import { IsString, IsDecimal, IsNotEmpty } from "class-validator";
export class CreatePagoAnticipadoDto {

    @IsNotEmpty()
    idcuenta: string;
    @IsNotEmpty()
    idcliente: string;
    @IsDecimal()
    pago: number;
   
    numerocheque: string;
   
    numeroTransferencia: string;
    
    }



