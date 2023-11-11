
import { Module } from '@nestjs/common';
import { RoleModule } from './modules/role/role.module';
import { UsersModule } from './modules/users/users.module';
import { UserDetailModule } from './modules/user_detail/user_detail.module';
import { ConfigModule } from './config/config.module';
import { Configuration } from './config/config.keys';
import { ConfigService } from './config/config.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { EmpresaModule } from './modules/empresa/empresa.module';
import { ProyectoModule } from './modules/proyecto/proyecto.module';
import { ClienteModule } from './modules/cliente/cliente.module';
import { ConduceModule } from './modules/conduce/conduce.module';
import { EmpleadoModule } from './modules/empleado/empleado.module';
import { ServicioModule } from './modules/servicio/servicio.module';
import { CargoModule } from './modules/cargo/cargo.module';
import { ConsumoCombustibleModule } from './modules/consumo_combustible/consumo_combustible.module';
import { FacturaModule } from './modules/factura/factura.module';
import { EstadoFacturaModule } from './modules/estado_factura/estado_factura.module';
import { CotizacionModule } from './modules/cotizacion/cotizacion.module';
import { GastosProyectoModule } from './modules/gastos_proyecto/gastos_proyecto.module';
import { GastosEmpresasModule } from './modules/gastos_empresas/gastos_empresas.module';
import { EstadosGastosModule } from './modules/estados_gastos/estados_gastos.module';
import { IngresosModule } from './modules/ingresos/ingresos.module';
import { ContactoModule } from './modules/contacto/contacto.module';
import { LogModule } from './modules/log/log.module';
import { ImpuestosModule } from './modules/impuestos/impuestos.module';
import { MaterialModule } from './modules/material/material.module';
import { LocalidadesModule } from './modules/localidades/localidades.module';
import { EquiposModule } from './modules/equipos/equipos.module';
import { PiezasModule } from './modules/piezas/piezas.module';

import { TipoEquipoModule } from './modules/tipo_equipo/tipo_equipo.module';
import { MarcaModule } from './modules/marca/marca.module';
import { ConduceProcezadoModule } from './modules/conduce-procezado/conduce-procezado.module';
import { PreFacturaModule } from './modules/pre-factura/pre-factura.module';
import { ServicioProcesadoModule } from './modules/servicio-procesado/servicio-procesado.module';

@Module({
   
 imports:[
    ConfigModule,
     DatabaseModule,
     UsersModule,
     RoleModule,
     UserDetailModule,
     AuthModule,
     EmpresaModule,
     ProyectoModule,
     ClienteModule, 
     ConduceModule,
     EmpleadoModule,
     ServicioModule,
     CargoModule,
     ConsumoCombustibleModule,
     FacturaModule, 
     EstadoFacturaModule,
     CotizacionModule,    
     GastosProyectoModule,
     GastosEmpresasModule,
     EstadosGastosModule,
     IngresosModule,
     ContactoModule,   
     LogModule,  
     ImpuestosModule,
     MaterialModule,
     LocalidadesModule,
     EquiposModule,
     PiezasModule,
    
     TipoEquipoModule,
     MarcaModule,
     ConduceProcezadoModule,
     PreFacturaModule,
     ServicioProcesadoModule]
})
export class AppModule {
 static port: number | string;
 constructor(private readonly _configService:ConfigService){
  AppModule.port = this._configService.get(Configuration.PORT);
 }
  
  
}

