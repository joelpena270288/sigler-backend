
import { Module } from '@nestjs/common';
import { RoleModule } from './modules/role/role.module';
import { UsersModule } from './modules/users/users.module';

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

import { CotizacionModule } from './modules/cotizacion/cotizacion.module';

import { GastosEmpresasModule } from './modules/gastos_empresas/gastos_empresas.module';

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
import { B01Module } from './modules/b01/b01.module';
import { B02Module } from './modules/b02/b02.module';
import { B14Module } from './modules/b14/b14.module';

import { MonedaModule } from './modules/moneda/moneda.module';


import { CuentasEmpresaModule } from './modules/cuentas-empresa/cuentas-empresa.module';
import { PagoFacturaModule } from './modules/pago-factura/pago-factura.module';
import { PagoAnticipadosModule } from './modules/pago-anticipados/pago-anticipados.module';
import { PagoGastoModule } from './modules/pago-gasto/pago-gasto.module';
import { GastoItemModule } from './modules/gasto_item/gasto_item.module';
import { CombustibleModule } from './modules/combustible/combustible.module';
import { ReportGastoModule } from './modules/report-gasto/report-gasto.module';
import { ReportIngresoModule } from './modules/report-ingreso/report-ingreso.module';
import { ReportTrabajadorConduceModule } from './modules/report-trabajador-conduce/report-trabajador-conduce.module';
import { Report06Module } from './modules/report-06/report-06.module';

@Module({
   
 imports:[
    ConfigModule,
     DatabaseModule,
     UsersModule,
     RoleModule,
    
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
    
     CotizacionModule,    
   
     GastosEmpresasModule,
   
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
     ServicioProcesadoModule,
     B01Module,
     B02Module,
     B14Module,
  
     MonedaModule,
   
   
   
     CuentasEmpresaModule,
   
     PagoFacturaModule,
   
     PagoAnticipadosModule,
   
     PagoGastoModule,
   
     GastoItemModule,
   
     CombustibleModule,
   
     ReportGastoModule,
   
     ReportIngresoModule,
   
     ReportTrabajadorConduceModule,
   
     Report06Module]
})
export class AppModule {
 static port: number | string;
 constructor(private readonly _configService:ConfigService){
  AppModule.port = this._configService.get(Configuration.PORT);
 }
  
  
}

