import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTipoImpuestosDgiDto } from './dto/create-tipo_impuestos_dgi.dto';
import { UpdateTipoImpuestosDgiDto } from './dto/update-tipo_impuestos_dgi.dto';
import {TipoImpuestosDgi} from './entities/tipo_impuestos_dgi.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TipoImpuestosDgiService {
  constructor(
    @Inject('TIPOIMPUESTODGI_REPOSITORY')
    private tipoImpuestoDgiRepository: Repository<TipoImpuestosDgi>,
  ) {}

 async create(createTipoImpuestosDgiDto: CreateTipoImpuestosDgiDto):Promise<TipoImpuestosDgi> {
  const  newImpuesto: TipoImpuestosDgi = new TipoImpuestosDgi();
  newImpuesto.name = createTipoImpuestosDgiDto.name.toUpperCase();
   
    const createdImpuesto: TipoImpuestosDgi =
      await this.tipoImpuestoDgiRepository.save(newImpuesto);
    return createdImpuesto;
   
  }

 async findAll():Promise<TipoImpuestosDgi[]> {
    return  await this.tipoImpuestoDgiRepository.find();
  }

 async findOne(id: string):Promise<TipoImpuestosDgi> {
  const foundImpuesto: TipoImpuestosDgi = await this.tipoImpuestoDgiRepository.findOne({where:{id: id}});
  if(!foundImpuesto){
    throw new NotFoundException('No existe el tipo de Impuesto');
  } 
  
  return foundImpuesto;
  }

async  update(id: string, updateTipoImpuestosDgiDto: UpdateTipoImpuestosDgiDto):Promise<TipoImpuestosDgi> {
    const foundImpuesto: TipoImpuestosDgi = await this.tipoImpuestoDgiRepository.findOne({where:{id: id}});
  if(!foundImpuesto){
    throw new NotFoundException('No existe el tipo de Impuesto');
  } 
  foundImpuesto.name = updateTipoImpuestosDgiDto.name.toUpperCase();
  foundImpuesto.updatedAt = new Date();
  return await this.tipoImpuestoDgiRepository.save(foundImpuesto);
  }

 async remove(id: string):Promise<TipoImpuestosDgi> {
    const foundImpuesto: TipoImpuestosDgi = await this.tipoImpuestoDgiRepository.findOne({where:{id: id}});
    if(!foundImpuesto){
      throw new NotFoundException('No existe el tipo de Impuesto');
    } 
     return await this.tipoImpuestoDgiRepository.remove(foundImpuesto);
  }
}
