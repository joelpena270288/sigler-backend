import { Inject, Injectable } from '@nestjs/common';
import { CreateRetencionDto } from './dto/create-retencion.dto';
import { UpdateRetencionDto } from './dto/update-retencion.dto';
import { Retencion } from './entities/retencion.entity';
import {Status} from '../../EntityStatus/entity.estatus.enum';
import { Repository } from 'typeorm';

@Injectable()
export class RetencionService {
  constructor(
    @Inject('RETENCION_REPOSITORY')
    private retencionRepository: Repository<Retencion>,
  ) {}
 async create(createRetencionDto: CreateRetencionDto):Promise<Retencion> {
  const findRetencion = await this.retencionRepository.findOne({
    where: { name: createRetencionDto.name.toUpperCase() },
  });

  if (findRetencion) {
    findRetencion.status = Status.ACTIVO;
   return await this.retencionRepository.save(findRetencion);
  }
  const retencion: Retencion = new Retencion();
  retencion.name = createRetencionDto.name;
  retencion.valorimpuesto = createRetencionDto.valorimpuesto;
  retencion.valorretencion = createRetencionDto.valorretencion;
  return await this.retencionRepository.save(retencion);

  }

 async findAll(): Promise<Retencion[]> {
    return await this.retencionRepository.find({where: {status: Status.ACTIVO}});
  }

  findOne(id: number) {
    return `This action returns a #${id} retencion`;
  }

  update(id: number, updateRetencionDto: UpdateRetencionDto) {
    return `This action updates a #${id} retencion`;
  }

  remove(id: number) {
    return `This action removes a #${id} retencion`;
  }
}
