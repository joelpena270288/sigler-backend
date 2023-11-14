import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateB14Dto } from './dto/create-b14.dto';
import { UpdateB14Dto } from './dto/update-b14.dto';
import { B14 } from './entities/b14.entity';
import { Repository } from 'typeorm';
import { Status } from '../../EntityStatus/entity.estatus.enum';

@Injectable()
export class B14Service {
  constructor(
    @Inject('B14_REPOSITORY')
    private b14Repository: Repository<B14>,
  ) {}

 async create(createB14Dto: CreateB14Dto): Promise<boolean> {
    for (let index = createB14Dto.init; index <= createB14Dto.end; index++) {
       
      const b14: B14 = new B14();
      b14.fecha = createB14Dto.fecha;

      b14.valor ='B14'+ index;
      try{
        await this.b14Repository.save(b14);
      }catch(e){
        console.log('Error al insertar');
      }
    }
return true;
  }

  findAll() {
    return `This action returns all b14`;
  }

 async findOne(): Promise<B14> {
  const found: B14 =  await this.b14Repository.findOne({where:{status: Status.ACTIVO}}) ;
  if(!found){
      throw new NotFoundException('No quedan consecutivos disponibles');
  }
  return found;
  }

  update(id: number, updateB14Dto: UpdateB14Dto) {
    return `This action updates a #${id} b14`;
  }

  remove(id: number) {
    return `This action removes a #${id} b14`;
  }
}
