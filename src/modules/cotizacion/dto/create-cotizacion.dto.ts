import { IsString, IsInt,IsDecimal } from "class-validator";
export class CreateCotizacionDto {
    @IsString()   
    nombreServicio: string;
    @IsString()   
    UM: string;
    @IsDecimal()
    cantidad: number;
    @IsDecimal()
    precio: number;
    @IsDecimal()
    valorimpuesto: number; 
    @IsString()
    proyectoId: string;
    

}
