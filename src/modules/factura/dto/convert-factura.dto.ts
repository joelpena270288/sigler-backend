import { IsString, IsInt, IsDate } from 'class-validator';

export class ConvertFacturaDto {
    @IsInt()
    idncf: number;
	@IsString()
	idmoneda: string;
    @IsString()
    tipopago: string;
    @IsInt()
    dias: number;
	


}
