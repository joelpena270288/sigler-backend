import { IsString, IsInt, IsDate } from 'class-validator';
export class UpdateNotaFacturaDto  {
	
	 @IsString()
    nota: string;
}
