import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateB02Dto } from './dto/create-b02.dto';
import { UpdateB02Dto } from './dto/update-b02.dto';
import { B02 } from './entities/b02.entity';
import { Repository } from 'typeorm';
import { Status } from '../../EntityStatus/entity.estatus.enum';

@Injectable()
export class B02Service {
  constructor(
    @Inject('B02_REPOSITORY')
    private b02Repository: Repository<B02>
  ) {}
  
    async create(createB02Dto: CreateB02Dto): Promise<boolean>  {
      for (let index = createB02Dto.init; index <= createB02Dto.end; index++) {
       
        const b02: B02 = new B02();
        b02.fecha = createB02Dto.fecha;
        b02.valor = "B02"+ index;
        try{
          await this.b02Repository.save(b02);
        }catch(e){
          console.log('Error al insertar ');
        }
      }
      
  return true;
  
  }

 

 async findOne(): Promise<B02> {
   const foundB02: B02 =  await this.b02Repository.findOne({where:{status: Status.ACTIVO}}) ;
   if(! foundB02){
    throw new NotFoundException("No quedan consecutivos disponibles");
   }
   return foundB02;
  }

 

}

