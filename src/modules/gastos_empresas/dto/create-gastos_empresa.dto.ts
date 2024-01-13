
import { IsString, IsInt,IsDecimal, IsNotEmpty } from "class-validator";
import {CreateGastoItemDto} from '../../gasto_item/dto/create-gasto_item.dto';
export class CreateGastosEmpresaDto {
    @IsNotEmpty()
    descripcion: string;
  
    @IsNotEmpty()
    NCF: string;
    @IsNotEmpty()
    factura: string;
   
    @IsDecimal()
    propina: number;  
    @IsDecimal()
    impuestoselectivoconsumo: number;
    
    @IsNotEmpty()
    fecha: Date;
    idproyecto: string; 
    @IsNotEmpty()
    idprovedor: string;
    tipopago: string;
    items: CreateGastoItemDto[];

  
}
