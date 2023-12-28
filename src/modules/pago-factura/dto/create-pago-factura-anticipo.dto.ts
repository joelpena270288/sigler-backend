import { IsString, IsDecimal } from "class-validator";
export class CreatePagoFacturaAnticipoDto {
@IsString()
idpagoAnticipo: string;
@IsString()
idfactura: string;

}
