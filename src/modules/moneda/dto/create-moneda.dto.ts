

import { IsString, IsDecimal } from "class-validator";
export class CreateMonedaDto {
@IsString()   
valor: string;
@IsDecimal()
tasa: number;
}
