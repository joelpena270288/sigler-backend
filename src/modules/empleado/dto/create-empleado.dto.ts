import { IsString, IsInt, IsDate } from 'class-validator';
export class CreateEmpleadoDto {
@IsString()
name: string;
@IsString()
lastname: string;
@IsString()
phone: string;
@IsString()
address: string;
@IsString()
passport: string;
@IsString()
cedule: string;
cargos: string[];

}
