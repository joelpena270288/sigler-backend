import { IsString, IsInt,IsDecimal,IsDate } from "class-validator";
export class CreatePiezaDto {
    @IsInt()
    cantidad: number;
   @IsString()
    nombre: string;
    @IsString()
    serie: string;
    @IsString()
    descripcion: string;
}
