import { Inject, Injectable } from '@nestjs/common';
import { ReadReport06Dto } from './dto/read-report-06.dto';
import { Factura } from '../factura/entities/factura.entity';
import { Repository } from 'typeorm';
import { FiltroFechaDto } from './dto/filtro-fecha.dto';
import { StatusFactura } from '../factura/entities/fatura-status.enum';
import { GastosEmpresa } from '../gastos_empresas/entities/gastos_empresa.entity';
import { Status } from '../../EntityStatus/entity.estatus.enum';

import { GastosResumen } from './dto/gasto.dto';
import { StatusGasto } from '../gastos_empresas/entities/gasto-status.enum';
import * as moment from 'moment';
import { TipoDocumento } from '../provedor/dto/tipo-documento.enum';
@Injectable()
export class Report06Service {
  constructor(
    @Inject('GASTOEMPRESA_REPOSITORY')
    private gastoRepository: Repository<GastosEmpresa>,
  ) {}
  async getReport06(filtroFechaDto: FiltroFechaDto): Promise<ReadReport06Dto> {
    const readReport06Dto: ReadReport06Dto = new ReadReport06Dto();

    readReport06Dto.gastosResumen = [];

    const gastos: GastosEmpresa[] = await this.gastoRepository
      .createQueryBuilder('gasto')
      .innerJoinAndSelect(
        'gasto.gastosItems',

        'gastoItem',
        'gastoItem.status = :estadoitem',
        { estadoitem: Status.ACTIVO },
      )
      .innerJoinAndSelect(
        'gasto.provedor',
        'provedor',
       
      )
      .where('gasto.createdAt >= :start', {
        start: filtroFechaDto.start + ' 00:00:00',
      })
      .andWhere('gasto.createdAt  <= :end', {
        end: filtroFechaDto.end + ' 23:59:00',
      })
      .andWhere('gasto.status  != :estadogasto', {
        estadogasto: StatusGasto.CANCELADO,
      })
      .andWhere('provedor.tipodocumento  != :tipodocumento', {
        estadogasto: TipoDocumento.PASAPORTE,
      })
      .getMany();

    if (gastos) {
      for (let index = 0; index < gastos.length; index++) {
        const gastosResumen: GastosResumen = new GastosResumen();
        gastosResumen.subtotal = 0;
        gastosResumen.itbis = 0;
        gastosResumen.fecha = moment( gastos[index].createdAt).format( "YYYY-MM-DD");
        gastosResumen.formapago = gastos[index].tipoPago;
        gastosResumen.servicio = gastos[index].descripcion;
        gastosResumen.ncf = gastos[index].NCF;
        gastosResumen.rnc = gastos[index].provedor.documento;
        gastosResumen.isc = parseFloat( gastos[index].impuestoselectivoconsumo.toString());
        gastosResumen.propina = parseFloat( gastos[index].propina.toString());

        for (
          let jindex = 0;
          jindex < gastos[index].gastosItems.length;
          jindex++
        ) {
          gastosResumen.itbis =
            parseFloat(gastosResumen.itbis.toString()) +
            parseFloat(
              gastos[index].gastosItems[jindex].importeimpuesto.toString(),
            );
          gastosResumen.subtotal =
            parseFloat(gastosResumen.subtotal.toString()) +
            parseFloat(gastos[index].gastosItems[jindex].importe.toString());
        }
        gastosResumen.itbis.toFixed(2);
        gastosResumen.subtotal.toFixed(2);
        readReport06Dto.gastosResumen.push(gastosResumen);
      }
    }
    return readReport06Dto;
  }
}
