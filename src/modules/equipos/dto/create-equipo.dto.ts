import { IsString, IsInt, IsDate } from 'class-validator';
export class CreateEquipoDto {
	 @IsString()  
    ficha: string;
   @IsString()
    placa: string; 
    @IsString()  
    chasis: string;
    @IsInt()
     anno: number; 
     @IsString() 
    color: string;  
    @IsString()  
    idmarca: string;
	 @IsString()  
    idtipo: string;
	metraje: string;
	 @IsString()  
    modelo: string;
	
}
