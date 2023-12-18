import { IsString, IsInt, IsDate } from 'class-validator';
export class CreateClienteDto {
  @IsString()
  nombre: string;
  @IsString()
  apellidos: string;
  @IsString()
  direccion: string;
  @IsString()
  telefono: string;
  @IsString()
  rcn: string;
  @IsString()
  tipoDocumento: string;

}
