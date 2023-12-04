import { IsString, IsInt,IsDecimal,IsDate } from "class-validator";
export class CreateConsumoCombustibleDto {
 @IsDecimal()
galones: number;
@IsString()
idcombustible: string;
@IsString()
idequipo: string;
@IsString()
idproyecto: string;
@IsString() 
 NCF: string;
 @IsString() 
factura: string;
@IsString()   
RNC: string;
@IsString()  
 direccion: string; 
 @IsString()   
  proyecto: string; 
@IsDate()
fecha: Date; 
@IsDecimal()
importeimpuesto: number;
@IsDecimal()
importe: number;
@IsDecimal()
valortotal: number;


}
