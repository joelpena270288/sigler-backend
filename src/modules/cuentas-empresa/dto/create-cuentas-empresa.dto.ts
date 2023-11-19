
import { IsString } from "class-validator";
export class CreateCuentasEmpresaDto {
    @IsString()
    idmoneda: string;
    @IsString()
    numerocuenta: string;
    @IsString()
    banco: string;

}
