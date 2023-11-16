import { IsString, IsInt, IsDate } from 'class-validator';

export class ConvertFacturaDto {
    @IsInt()
    idncf: number;
	


}
