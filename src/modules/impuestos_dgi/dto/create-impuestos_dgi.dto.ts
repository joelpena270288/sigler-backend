import { IsString, IsInt, IsDate, IsDecimal, IsNotEmpty, isNotEmpty } from 'class-validator';
export class CreateImpuestosDgiDto {
    @IsNotEmpty()
    idtipo: string;
    @IsNotEmpty()
    idcuenta: string;
  @IsNotEmpty()
   fecha: Date;
   @IsNotEmpty()
   fechapago: Date;
    @IsDecimal()
  valor: number;
  @IsNotEmpty()
  documento: string;
  @IsNotEmpty()
metododepago: string;
@IsNotEmpty()
pagodesde: string;

}
