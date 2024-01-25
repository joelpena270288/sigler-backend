import { IsString, IsInt, IsDate, IsEmail, IsBoolean, IsDecimal } from 'class-validator';
export class DeleteRetencionGastoDto {
    @IsString()
   
    idGasto: string;
  

}
