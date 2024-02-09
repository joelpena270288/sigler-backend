import { IsString, IsInt, IsDate, IsDecimal, IsNotEmpty, isNotEmpty } from 'class-validator';
export class CreateImpuestosDgiDto {
    @IsNotEmpty()
    idtipo: string;
  @IsNotEmpty()
   fecha: Date;
    @IsDecimal()
  valor: number;

}
