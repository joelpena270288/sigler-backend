import { IsString, IsDecimal } from "class-validator";

export class CreateConduceProcezadoDto {
 @IsString()   
idconduce: string;
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




}
