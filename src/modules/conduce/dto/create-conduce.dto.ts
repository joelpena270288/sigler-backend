import { IsString } from "class-validator";

export class CreateConduceDto {
    @IsString()
    name: string;  
    @IsString() 
    idProyecto: string;  
    @IsString() 
    idEmpleado: string;  
    @IsString() 
    idServicio: string;   
    @IsString()
    idEquipo: string;  
    @IsString() 
    firma_chofer: string;  
    @IsString() 
    firma_cliente: string;  
    @IsString() 
    observaciones: string; 
    @IsString()
    fecha: string; 
    @IsString()
    horaInicio: string;
    @IsString()
    horaFin: string;
    @IsString()
    desde: string; 
    @IsString()  
    hasta: string;   
    @IsString()
    idMaterial: string;
    cantidadViaje: number;
    metrosCubicos: number;
    @IsString()
    reportadasequipo: string;
    @IsString()
    reportadastrabajador: string;

}
