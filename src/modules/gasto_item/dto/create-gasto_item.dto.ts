
import { IsString, IsInt,IsDecimal } from "class-validator";
export class CreateGastoItemDto {
	 @IsDecimal()
    cantidad: number;  
   @IsString()
    descripcion: string;  
    @IsDecimal()
    importeimpuesto: number;  
    @IsDecimal() 
    importe: number;
 
}
