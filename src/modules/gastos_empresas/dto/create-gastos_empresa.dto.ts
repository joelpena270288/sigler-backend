
import { IsString, IsInt,IsDecimal, IsNotEmpty } from "class-validator";
import {CreateGastoItemDto} from '../../gasto_item/dto/create-gasto_item.dto';
export class CreateGastosEmpresaDto {
    @IsNotEmpty()
    descripcion: string;
    @IsNotEmpty()
    Nombre: string;
    @IsNotEmpty()
    NCF: string;
    @IsNotEmpty()
    factura: string;
    @IsNotEmpty()
    RNC: string;
    @IsDecimal()
    propina: number;  
    @IsDecimal()
    impuestoselectivoconsumo: number;
    @IsString()
    direccion: string; 
    @IsNotEmpty()
    fecha: Date;
    idproyecto: string; 
    
    tipopago: string;
    items: CreateGastoItemDto[];

  
}
