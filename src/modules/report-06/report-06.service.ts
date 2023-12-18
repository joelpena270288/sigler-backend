import { Inject, Injectable } from '@nestjs/common';
import { ReadReport06Dto } from './dto/read-report-06.dto';
import { Factura } from '../factura/entities/factura.entity';
import { Repository } from 'typeorm';
import { FiltroFechaDto } from './dto/filtro-fecha.dto';
import { StatusFactura } from '../factura/entities/fatura-status.enum';
import { GastosEmpresa } from '../gastos_empresas/entities/gastos_empresa.entity';
import { Status } from '../../EntityStatus/entity.estatus.enum';

import { FacturaResumen} from './dto/facturas.dto';
import { GastosResumen } from './dto/gasto.dto';
import { StatusGasto } from '../gastos_empresas/entities/gasto-status.enum';


@Injectable()
export class Report06Service {
  constructor(
    @Inject('FACTURA_REPOSITORY')
    private facturaRepository: Repository<Factura>,
    @Inject('GASTOEMPRESA_REPOSITORY')
    private gastoRepository: Repository<GastosEmpresa>,
   
   
  ) {}
 async getReport06(filtroFechaDto: FiltroFechaDto):Promise<ReadReport06Dto> {
  const readReport06Dto: ReadReport06Dto = new ReadReport06Dto();
  readReport06Dto.facturasResumen = [];
  readReport06Dto.gastosResumen = [];
    const factura: Factura[] = await this.facturaRepository.createQueryBuilder('factura')
  .innerJoinAndSelect('factura.servicioProcesado','servicioProcesado')  
  .innerJoinAndSelect('factura.cliente','cliente') 
  .where('factura.fechafactura >= :start',{start: filtroFechaDto.start+' 00:00:00'}) 
  .andWhere('factura.fechafactura  <= :end',{end: filtroFechaDto.end+' 23:59:00'}) 
  .andWhere('factura.status  != :estado',{estado: StatusFactura.CANCELADA}) 
  .getMany();
 
  const gastos: GastosEmpresa[] = await this.gastoRepository.createQueryBuilder('gasto')
  .innerJoinAndSelect('gasto.gastosItems','gastoItem', 'gastoItem.status = :estadoitem', {estadoitem: Status.ACTIVO})  
  .where('gasto.createdAt >= :start',{start: filtroFechaDto.start+' 00:00:00'}) 
  .andWhere('gasto.createdAt  <= :end',{end: filtroFechaDto.end+' 23:59:00'}) 
  .andWhere('gasto.status  != :estadogasto',{estadogasto: StatusGasto.CANCELADO}) 
  .getMany();
 

if(factura){
for (let index = 0; index < factura.length; index++) {
  const facturaResumen : FacturaResumen = new  FacturaResumen();
  facturaResumen.itbis = 0;
  facturaResumen.monto = 0;
  facturaResumen.comprobante = factura[index].ncf;
  facturaResumen.fechacomprobante = factura[index].fechancf;
  facturaResumen.formapago = factura[index].tipoPago;
  facturaResumen.rnc = factura[index].cliente.rcn;
  facturaResumen.tipoidentificacion = factura[index].cliente.tipoDocumento;
 for(let jindex = 0; jindex < factura[index].servicioProcesado.length; jindex ++ ){
 facturaResumen.itbis = parseFloat(facturaResumen.itbis.toString()) + parseFloat( factura[index].servicioProcesado[jindex].importeimpuesto.toString());
 facturaResumen.monto = parseFloat(facturaResumen.monto.toString()) + parseFloat(factura[index].servicioProcesado[jindex].importe.toString())
 

 }
 facturaResumen.itbis.toFixed(2);
 facturaResumen.monto.toFixed(2);
 readReport06Dto.facturasResumen.push(facturaResumen);
  
}

}if(gastos){
  for (let index = 0; index < gastos.length; index++) {
   const gastosResumen: GastosResumen = new GastosResumen();
   gastosResumen.subtotal = 0;
   gastosResumen.itbis = 0;
   gastosResumen.fecha = gastos[index].createdAt;
   gastosResumen.formapago = gastos[index].tipoPago;
   gastosResumen.servicio = gastos[index].descripcion;
   gastosResumen.ncf = gastos[index].NCF;
   gastosResumen.rnc = gastos[index].RNC;
   
   for (let jindex = 0; jindex < gastos[index].gastosItems.length; jindex++) {
    gastosResumen.itbis = parseFloat(gastosResumen.itbis.toString()) + parseFloat( gastos[index].gastosItems[jindex].importeimpuesto.toString());
    gastosResumen.subtotal = parseFloat(gastosResumen.subtotal.toString()) + parseFloat(gastos[index].gastosItems[jindex].importe.toString())
    
    
   }
   gastosResumen.itbis.toFixed(2);
   gastosResumen.subtotal.toFixed(2);
   readReport06Dto.gastosResumen.push(gastosResumen);
    
  }

}
return readReport06Dto;
   
  }

 
}
