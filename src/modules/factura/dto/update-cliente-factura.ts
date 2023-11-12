import { IsString, IsInt, IsDate } from 'class-validator';

export class UpdateClientePrefacturaDto {
  
    @IsString()
    idcliente: string;
   

}