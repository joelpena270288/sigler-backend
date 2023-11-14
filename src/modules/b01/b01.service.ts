import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateB01Dto } from './dto/create-b01.dto';
import { UpdateB01Dto } from './dto/update-b01.dto';
import { B01 } from './entities/b01.entity';
import { Index, Repository } from 'typeorm';
import { boolean } from 'joi';
import { Status } from '../../EntityStatus/entity.estatus.enum';

@Injectable()
export class B01Service {
  constructor(
    @Inject('B01_REPOSITORY')
    private b01Repository: Repository<B01>,
  ) {}
 async create(createB01Dto: CreateB01Dto): Promise<boolean>  {
    for (let index = createB01Dto.init; index <= createB01Dto.end; index++) {
     
      const b01: B01 = new B01();
      b01.fecha = createB01Dto.fecha;
      b01.valor = "B01"+ index;
      try{
        await this.b01Repository.save(b01);
      }catch(e){
        console.log('Error al insertar ');
      }
    }
    
return true;

  }

  findAll() {
    return `This action returns all b01`;
  }

 async findOne(): Promise<B01> {
  const found: B01 =     await this.b01Repository.findOne({where:{status: Status.ACTIVO}}) ;
  if(!found){
      throw new NotFoundException('No quedan consecutivos disponibles');
  }
  return found;
  }

  update(id: number, updateB01Dto: UpdateB01Dto) {
    return `This action updates a #${id} b01`;
  }

  remove(id: number) {
    return `This action removes a #${id} b01`;
  }
}
