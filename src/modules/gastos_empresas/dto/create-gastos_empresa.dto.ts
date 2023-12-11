
import { IsString, IsInt,IsDecimal } from "class-validator";
import {CreateGastoItemDto} from '../../gasto_item/dto/create-gasto_item.dto';
export class CreateGastosEmpresaDto {
    @IsString()
    descripcion: string;
    @IsString()
    Nombre: string;
    @IsString()
    NCF: string;
    @IsString()
    factura: string;
    @IsString()
    RNC: string;
    @IsString()
    direccion: string; 
    @IsString()
    idproyecto: string;
    @IsString()
    tipopago: string;
    items: CreateGastoItemDto[];

  
}
