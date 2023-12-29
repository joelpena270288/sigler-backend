import { IsNotEmpty, IsString } from "class-validator";

export class CreateConduceDto {
    
  @IsNotEmpty()
    name: string;  
   
  @IsNotEmpty()
    idProyecto: string;  
   
  @IsNotEmpty() 
    idEmpleado: string;  
    
  @IsNotEmpty()
    idServicio: string;   
  
    @IsNotEmpty()
    idEquipo: string;  
    
  @IsNotEmpty() 
    firma_chofer: string;  
    
  @IsNotEmpty()
    firma_cliente: string;  
    @IsString() 
    observaciones: string; 
    @IsString()
    fecha: string; 
    @IsString()
    horaInicio: string;
    @IsString()
    horaFin: string;
   
    desde: string; 
   
    hasta: string;   
   
  @IsNotEmpty()
    idMaterial: string;
    cantidadViaje: number;
    metrosCubicos: number;
  
   
    reportadasequipo: string;
   
  @IsNotEmpty()
    reportadastrabajador: string;
 
    @IsNotEmpty()
    cantidadConsummoCombustible: string;
}
