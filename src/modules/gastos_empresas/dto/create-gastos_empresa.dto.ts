
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
    @IsDecimal()
    propina: number;  
    @IsDecimal()
    impuestoselectivoconsumo: number;
    @IsString()
    direccion: string; 
    @IsString()
    idproyecto: string;  
    tipopago: string;
    items: CreateGastoItemDto[];

  
}
