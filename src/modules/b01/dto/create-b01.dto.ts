import { IsString, IsInt, IsDate } from 'class-validator';
export class CreateB01Dto {
    @IsInt()
    init: number;
    @IsInt()
    end: number;
    @IsDate()
    fecha: Date;
}
