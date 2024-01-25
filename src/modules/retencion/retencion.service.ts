import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRetencionDto } from './dto/create-retencion.dto';
import { UpdateRetencionDto } from './dto/update-retencion.dto';
import { Retencion } from './entities/retencion.entity';
import {Status} from '../../EntityStatus/entity.estatus.enum';
import { Repository } from 'typeorm';
import { GastosEmpresa } from '../gastos_empresas/entities/gastos_empresa.entity';
import { CreateRetencionGastoDto } from './dto/create-retencion-gasto.dto';
import { GastoItem } from '../gasto_item/entities/gasto_item.entity';
import { PagoGasto } from '../pago-gasto/entities/pago-gasto.entity';
import { DeleteRetencionGastoDto } from './dto/delete-retencion-gasto.dto';

@Injectable()
export class RetencionService {
  constructor(
    @Inject('RETENCION_REPOSITORY')
    private retencionRepository: Repository<Retencion>,
    @Inject('GASTOEMPRESA_REPOSITORY')
    private gastoRepository: Repository<GastosEmpresa>,
    
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
  retencion.name = createRetencionDto.name.toUpperCase();
  retencion.valorimpuesto = createRetencionDto.valorimpuesto;
  retencion.valorretencion = createRetencionDto.valorretencion;
  retencion.descripcion = createRetencionDto.descripcion;
  return await this.retencionRepository.save(retencion);

  }

 async findAll(): Promise<Retencion[]> {
    return await this.retencionRepository.find({where: {status: Status.ACTIVO}});
  }

  findOne(id: string) {
    return `This action returns a #${id} retencion`;
  }

 async update(id: string, updateRetencionDto: UpdateRetencionDto): Promise<Retencion> {
    const findRetencion = await this.retencionRepository.findOne({
      where: { id: id },
    });
    if(!findRetencion){
      throw new BadRequestException('No se encontro la Retencion suministrada');
    
    }
    findRetencion.name =updateRetencionDto.name.toUpperCase();
    findRetencion.valorimpuesto = updateRetencionDto.valorimpuesto;
    findRetencion.valorretencion = updateRetencionDto.valorretencion;
    findRetencion.updatedAt = new Date();
    return await this.retencionRepository.save(findRetencion);
  }

async  remove(id: string): Promise<Retencion> {
    const findRetencion = await this.retencionRepository.findOne({
      where: { id: id },
    });
    if(!findRetencion){
      throw new BadRequestException('No se encontro la Retencion suministrada');
    
    }
    findRetencion.status = Status.INACTIVO;

    return await this.retencionRepository.save(findRetencion);
  }

 async adicionarRetencion(addRetencion: CreateRetencionGastoDto): Promise<Retencion>{
   const foundGasto: GastosEmpresa = await this.gastoRepository 
   .createQueryBuilder('gasto')
   .innerJoinAndSelect(
    'gasto.cuentaporpagar',
    'cuentaporpagar'
   )
   .innerJoinAndSelect(
    'gasto.gastosItems',

    'gastoItem',
    'gastoItem.status = :estadoitem',
    { estadoitem: Status.ACTIVO },
  )
  .leftJoinAndSelect('gasto.pagos','pago', 'pago.status = :estadopago',{estadopago: Status.ACTIVO})
  .where('gasto.id = :idgasto', {
    idgasto: addRetencion.idGasto,
  })

  .getOne();

   if(!foundGasto){
    throw new NotFoundException('El gasto Introducido No es valido');
   }
   const foundRetencion: Retencion = await this.retencionRepository.findOne({where:{id: addRetencion.idRetencion}});
   if(!foundRetencion){

    throw new NotFoundException('La Retencion introducida no es valida');
   }
   let valortotal = 0;
   let pagosrealizados = 0;
   for (let index = 0; index < foundGasto.gastosItems.length; index++) {
    valortotal = parseFloat(valortotal.toString()) + parseFloat( foundGasto.gastosItems[index].importe.toString());
    
   }
   valortotal = parseFloat(valortotal.toString()) * parseFloat(foundRetencion.valorimpuesto.toString());
   valortotal = parseFloat(valortotal.toString()) * parseFloat(foundRetencion.valorretencion.toString());
   
   for (let index = 0; index < foundGasto.pagos.length; index++) {
    pagosrealizados = parseFloat(foundGasto.pagos[index].pago.toString());
    
  }
  
  
   foundGasto.cuentaporpagar.montoinicial = parseFloat(foundGasto.cuentaporpagar.montoinicial.toString()) - parseFloat(valortotal.toString());

   foundGasto.cuentaporpagar.montorestante = parseFloat(foundGasto.cuentaporpagar.montoinicial.toString()) - parseFloat(pagosrealizados.toString());
    
   foundGasto.retencion = foundRetencion.name;
   foundGasto.valorretencion = valortotal;

   const savedGasto: GastosEmpresa = await this.gastoRepository.save(foundGasto);
   if(!savedGasto){
    throw new BadRequestException("Error al actualizar el gasto");
   }
 
  return foundRetencion;
  
  }

  async EliminarRetencion(id: string): Promise<String>{

    const foundGasto: GastosEmpresa = await this.gastoRepository.findOne({

      relations: {
        cuentaporpagar: true
      },
      where: {
      id: id
      }
    });
    if(!foundGasto){
      throw new BadRequestException("El gasto introducido no es valido");
    }

    foundGasto.cuentaporpagar.montoinicial = parseFloat(foundGasto.cuentaporpagar.montoinicial.toString()) + parseFloat(foundGasto.valorretencion.toString());
    foundGasto.cuentaporpagar.montorestante = parseFloat(foundGasto.cuentaporpagar.montorestante.toString()) +  parseFloat(foundGasto.valorretencion.toString());
   foundGasto.valorretencion = 0;
   foundGasto.retencion = '';
   const savedGasto: GastosEmpresa = await this.gastoRepository.save(foundGasto);
   if(!savedGasto){
    throw new BadRequestException('Error al eliminar la retencion del gasto');
   }
  return foundGasto.retencion;
  }
}
