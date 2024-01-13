import { IsString, IsInt, IsDate, IsEmail } from 'class-validator';
export class CreateProvedorDto {
    @IsString()
    nombre: string;     
    @IsString()
    direccion: string;  
    @IsString()
    documento: string;
    @IsString()
    tipoDocumento: string; 
   
}
