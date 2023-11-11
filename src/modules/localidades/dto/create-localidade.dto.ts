import { IsString, IsInt, IsDate } from 'class-validator';
export class CreateLocalidadeDto {
    @IsString()
    name: string;
  
}
