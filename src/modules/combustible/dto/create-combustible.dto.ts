import { IsString, IsInt, IsDate } from 'class-validator';
export class CreateCombustibleDto {
    @IsString()
    name: string;
}
