import { IsString, IsInt, IsDate } from 'class-validator';
import {PreFactura} from '../../pre-factura/entities/pre-factura.entity';
export class CreateFacturaDto {
    @IsString()
    idProyecto: string;
    prefacturas: PreFactura[];


}
