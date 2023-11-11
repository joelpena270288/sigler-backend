import { IsString, IsInt, IsDate, IsBoolean} from 'class-validator';
export class CreateProyectoDto {
@IsString()
name: string;
@IsString()
idCliente: string;
@IsBoolean()
ajuste: boolean;

}
