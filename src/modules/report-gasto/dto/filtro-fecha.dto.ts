import { IsString, IsInt, IsDate, IsBoolean} from 'class-validator';
export class FiltroFechaDto {
@IsDate()
start: Date;
@IsDate()
end: Date;

}
