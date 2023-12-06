import { Injectable } from '@nestjs/common';
import { ReadReportGastoDto } from './dto/read-report-gasto.dto';
import { GastosEmpresa } from '../gastos_empresas/entities/gastos_empresa.entity';
import { ConsumoCombustible } from '../consumo_combustible/entities/consumo_combustible.entity';
import {FiltroFechaDto} from  from './dto/filtro-fecha.dto';
import { Status } from '../../EntityStatus/entity.estatus.enum';
@Injectable()
export class ReportGastoService {
  constructor(
    @Inject('GASTOEMPRESA_REPOSITORY')
    private gastoempresaRepository: Repository<GastosEmpresa>,
    @Inject('CONSUMOCOMBUSTIBLE_REPOSITORY')
    private combustibleRepository: Repository<ConsumoCombustible>,
   
  ) {}

 async getReport(filtroFechaDto: FiltroFechaDto): Promise<ReadReportGastoDto> {
    const readReportGastoDto: ReadReportGastoDto = new ReadReportGastoDto();
    readReportGastoDto.itbis_gasto_combustible = 0;
    readReportGastoDto.itbis_gasto_empresa = 0;
    readReportGastoDto.itbis_gasto_proyecto = 0;
    readReportGastoDto.sub_total_gasto_combustible = 0;
    readReportGastoDto.sub_total_gasto_empresa = 0;
    readReportGastoDto.sub_total_gasto_proyecto = 0;
  const gastos: GastosEmpresa[] = await this.gastoempresaRepository.createQueryBuilder('gasto')
  .where('gasto.createdAt >= :start',{start: filtroFechaDto.start}) 
  .andWhere('gasto.createdAt  <= :end',{end: filtroFechaDto.end})
  .andWhere('gasto.status =:status',{status:Status.ACTIVO})
  .getMany();

  const combustible: ConsumoCombustible[] = await this.combustibleRepository.createQueryBuilder('combustible')
  .where('combustible.fecha >= :start',{start: filtroFechaDto.start}) 
  .andWhere('combustible.fecha  <= :end',{end: filtroFechaDto.end})
  .andWhere('combustible.status =:status',{status:Status.ACTIVO})
  .getMany();
  if(gastos){

    for (let index = 0; index < gastos.length; index++) {
     if(gastos[index].proyecto != null){
      for (let iter = 0; iter < gastos[index].gastosItems.length; iter++) {
        readReportGastoDto.itbis_gasto_proyecto  = parseFloat(readReportGastoDto.itbis_gasto_proyecto) + parseFloat(gastos[index].gastosItems[iter].importeimpuesto);
        readReportGastoDto.sub_total_gasto_proyecto = parseFloat( readReportGastoDto.sub_total_gasto_proyecto)+ parseFloat(gastos[index].gastosItems[iter].importe); 
        
      }

     }else{
      for (let iter = 0; iter < gastos[index].gastosItems.length; iter++) {
        readReportGastoDto.itbis_gasto_empresa  = parseFloat( readReportGastoDto.itbis_gasto_empresa ) + parseFloat(gastos[index].gastosItems[iter].importeimpuesto);
        readReportGastoDto.sub_total_gasto_empresa = parseFloat( readReportGastoDto.sub_total_gasto_empresa)+ parseFloat(gastos[index].gastosItems[iter].importe); 
        
      }

     }
      
    }
  }
  if(combustible){
  for (let index = 0; index < combustible.length; index++) {
   readReportGastoDto.itbis_gasto_combustible = parseFloat(readReportGastoDto.itbis_gasto_combustible )+ combustible[index].importeimpuesto;
   readReportGastoDto.sub_total_gasto_combustible = parseFloat(readReportGastoDto.sub_total_gasto_combustible ) + combustible[index].importe;
  }

  }

return readReportGastoDto;
 
  }


}
