import { IsString, IsInt, IsDate } from 'class-validator';
export class CreateB02Dto {
    @IsInt()
    init: number;
    @IsInt()
    end: number;
    @IsDate()
    fecha: Date;
}
