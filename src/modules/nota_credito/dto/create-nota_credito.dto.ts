import { IsString, IsInt,IsDecimal, IsNotEmpty } from "class-validator";
export class CreateNotaCreditoDto {
    @IsNotEmpty()
    idgasto: string;
    @IsNotEmpty()
    descripcion: string;
    @IsNotEmpty() 
    NCF: string;
   
    @IsDecimal()
    importe: number;  
    @IsDecimal()
    impuesto: number;    
    @IsNotEmpty()
    fecha: Date;
   

}
