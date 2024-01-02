import { IsString, IsInt,IsDecimal,IsDate, IsNotEmpty } from "class-validator";
export class CreateConsumoCombustibleDto {
 @IsDecimal()
galones: number;
@IsNotEmpty()
Nombre: string;
@IsNotEmpty()
idcombustible: string;
@IsNotEmpty()
idequipo: string;
proyecto:string;
idproyecto: string;
@IsNotEmpty()
 NCF: string;
 @IsNotEmpty()
factura: string;
@IsNotEmpty()  
RNC: string;
@IsString()  
 direccion: string; 

 @IsNotEmpty()
fecha: Date; 

importeimpuesto: number;
@IsDecimal()
importe: number;
@IsDecimal()
valortotal: number;


}
