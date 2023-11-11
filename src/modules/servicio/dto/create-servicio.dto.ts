import { IsString } from "class-validator";
export class CreateServicioDto {
@IsString()
name: string;
descripcion: string;


}
