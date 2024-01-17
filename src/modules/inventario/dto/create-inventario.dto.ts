import { IsDecimal, IsNotEmpty } from "class-validator";


export class CreateInventarioDto {

    @IsNotEmpty()
    nombre: string;
    @IsNotEmpty()

    descripcion: string;
    @IsDecimal()
    cantidad: number;
    @IsNotEmpty()
    descripcion: string;
    @IsNotEmpty()
    serie: string;	
    @IsNotEmpty()
     idequipo: string;
}
