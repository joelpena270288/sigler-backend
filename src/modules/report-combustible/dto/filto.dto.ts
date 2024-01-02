import { IsString, IsInt, IsDate, IsBoolean} from 'class-validator';
export class Filtro{
    @IsNotEmpty()
start: Date;
@IsNotEmpty()
end: Date;
@IsNotEmpty()
idequipo: string;

}