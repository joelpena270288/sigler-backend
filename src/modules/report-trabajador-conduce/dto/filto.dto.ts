import { IsString, IsInt, IsDate, IsBoolean} from 'class-validator';
export class Filtro{
    @IsDate()
start: Date;
@IsDate()
end: Date;
@IsString()
idempleado: string;

}