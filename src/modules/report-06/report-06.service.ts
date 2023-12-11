import { Inject, Injectable } from '@nestjs/common';
import { ReadReport06Dto } from './dto/read-report-06.dto';
import { Factura } from '../factura/entities/factura.entity';
import { Repository } from 'typeorm';
import { FiltroFechaDto } from './dto/filtro-fecha.dto';


@Injectable()
export class Report06Service {
  constructor(
    @Inject('FACTURA_REPOSITORY')
    private facturaRepository: Repository<Factura>,
   
   
  ) {}
 async create(filtroFechaDto: FiltroFechaDto) {
    const factura: Factura[] = await this.facturaRepository.createQueryBuilder('factura')
  .innerJoinAndSelect('factura.cuentaporcobrar','cuentaporcobrar')  
  .where('factura.fechafactura >= :start',{start: filtroFechaDto.start+' 00:00:00'}) 
  .andWhere('factura.fechafactura  <= :end',{end: filtroFechaDto.end+' 23:59:00'}) 
  .getMany();

   
  }

 
}
