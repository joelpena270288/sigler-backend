import { IsString } from "class-validator";

export class CreateTipoEquipoDto {
    @IsString()
    name: string;
}
