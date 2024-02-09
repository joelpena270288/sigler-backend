import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateImpuestosDgiDto } from './dto/create-impuestos_dgi.dto';
import { UpdateImpuestosDgiDto } from './dto/update-impuestos_dgi.dto';
import { Repository } from 'typeorm';
import { TipoImpuestosDgi } from '../tipo_impuestos_dgi/entities/tipo_impuestos_dgi.entity';
import { ImpuestosDgi } from './entities/impuestos_dgi.entity';
import * as moment from 'moment';
@Injectable()
export class ImpuestosDgiService {
  constructor(
    @Inject('TIPOIMPUESTODGI_REPOSITORY')
    private tipoImpuestoDgiRepository: Repository<TipoImpuestosDgi>,
    @Inject('IMPUESTODGI_REPOSITORY')
    private impuestoDgiRepository: Repository<ImpuestosDgi>,
  ) {}
 async create(createImpuestosDgiDto: CreateImpuestosDgiDto):Promise<ImpuestosDgi> {
  
   const fundtipo: TipoImpuestosDgi = await this.tipoImpuestoDgiRepository.findOne({where:{id: createImpuestosDgiDto.idtipo}});
   if(!fundtipo){
    throw new NotFoundException('El tipo de impuesto Introducido no es valido');
   }
   const newImpuesto: ImpuestosDgi = new ImpuestosDgi();
   newImpuesto.tipo = fundtipo;
   
   newImpuesto.valor = createImpuestosDgiDto.valor;
   newImpuesto.periodo = moment( createImpuestosDgiDto.fecha).format( "YYYYMM");
   newImpuesto.fecha = createImpuestosDgiDto.fecha;
  
  return  await this.impuestoDgiRepository.save(newImpuesto);
  }

 async findAll(): Promise<ImpuestosDgi[]> {
    return  await this.impuestoDgiRepository.find();
  }

 async findOne(id: string):Promise<ImpuestosDgi> {
  const foundImpuesto: ImpuestosDgi = await this.impuestoDgiRepository.findOne({where:{id: id}});
   
   if(!foundImpuesto){
    throw new NotFoundException("No existe el impuesto DDGI introducido");
   }
  return foundImpuesto;
  }

 async update(id: string, updateImpuestosDgiDto: UpdateImpuestosDgiDto):Promise<ImpuestosDgi> {
    const foundImpuesto: ImpuestosDgi = await this.impuestoDgiRepository.findOne({where:{id: id}});
   
    if(!foundImpuesto){
     throw new NotFoundException("No existe el impuesto DDGI introducido");
    }
    const fundtipo: TipoImpuestosDgi = await this.tipoImpuestoDgiRepository.findOne({where:{id: updateImpuestosDgiDto.idtipo}});
    if(!fundtipo){
     throw new NotFoundException('El tipo de impuesto Introducido no es valido');
    }

    foundImpuesto.updatedAt = new Date();
    foundImpuesto.periodo =  moment( updateImpuestosDgiDto.fecha).format( "YYYYMM");
    foundImpuesto.tipo = fundtipo;
    foundImpuesto.valor = updateImpuestosDgiDto.valor;
    foundImpuesto.fecha = updateImpuestosDgiDto.fecha;
    return  await this.impuestoDgiRepository.save(foundImpuesto);
  }

 async remove(id: string):Promise<ImpuestosDgi> {
    const foundImpuesto: ImpuestosDgi = await this.impuestoDgiRepository.findOne({where:{id: id}});
   
    if(!foundImpuesto){
     throw new NotFoundException("No existe el impuesto DDGI introducido");
    }
    return await this.impuestoDgiRepository.remove(foundImpuesto);
  }
}
