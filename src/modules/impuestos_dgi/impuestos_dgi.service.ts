import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateImpuestosDgiDto } from './dto/create-impuestos_dgi.dto';
import { UpdateImpuestosDgiDto } from './dto/update-impuestos_dgi.dto';
import { Repository } from 'typeorm';
import { TipoImpuestosDgi } from '../tipo_impuestos_dgi/entities/tipo_impuestos_dgi.entity';
import { ImpuestosDgi } from './entities/impuestos_dgi.entity';
import * as moment from 'moment';
import { CuentasEmpresa } from '../cuentas-empresa/entities/cuentas-empresa.entity';
@Injectable()
export class ImpuestosDgiService {
  constructor(
    @Inject('TIPOIMPUESTODGI_REPOSITORY')
    private tipoImpuestoDgiRepository: Repository<TipoImpuestosDgi>,
    @Inject('CUENTAEMPRESA_REPOSITORY')
    private cuentasRepository: Repository<CuentasEmpresa>,
    @Inject('IMPUESTODGI_REPOSITORY')
    private impuestoDgiRepository: Repository<ImpuestosDgi>,
  ) {}
 async create(createImpuestosDgiDto: CreateImpuestosDgiDto):Promise<ImpuestosDgi> {
  
   const fundtipo: TipoImpuestosDgi = await this.tipoImpuestoDgiRepository.findOne({where:{id: createImpuestosDgiDto.idtipo}});
   if(!fundtipo){
    throw new NotFoundException('El tipo de impuesto Introducido no es valido');
   }
   const foundcuenta: CuentasEmpresa = await this.cuentasRepository.findOne({where:{id: createImpuestosDgiDto.idcuenta }})
   if(!foundcuenta){
    throw new NotFoundException('La Cuenta Introducida no es valida');
   }
  
   const newImpuesto: ImpuestosDgi = new ImpuestosDgi();
   newImpuesto.tipo = fundtipo;
   
   newImpuesto.valor = createImpuestosDgiDto.valor;
  
   newImpuesto.fecha = createImpuestosDgiDto.fechapago;
   newImpuesto.documento = createImpuestosDgiDto.documento;
   newImpuesto.metododepago = createImpuestosDgiDto.metododepago;
   newImpuesto.pagodesde = createImpuestosDgiDto.pagodesde;
   newImpuesto.cuenta = foundcuenta;
   newImpuesto.periodo = createImpuestosDgiDto.periodo;
  
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
    const foundcuenta: CuentasEmpresa = await this.cuentasRepository.findOne({where:{id: updateImpuestosDgiDto.idcuenta }})
    if(!foundcuenta){
     throw new NotFoundException('La Cuenta Introducida no es valida');
    }
   
    foundImpuesto.updatedAt = new Date();
    foundImpuesto.periodo = updateImpuestosDgiDto.periodo;
    foundImpuesto.tipo = fundtipo;
    foundImpuesto.valor = updateImpuestosDgiDto.valor;
    foundImpuesto.periodo = updateImpuestosDgiDto.periodo;
    foundImpuesto.documento = updateImpuestosDgiDto.documento;
    foundImpuesto.metododepago = updateImpuestosDgiDto.metododepago;
    foundImpuesto.pagodesde = updateImpuestosDgiDto.pagodesde;
    foundImpuesto.cuenta = foundcuenta;
    foundImpuesto.fechapago = updateImpuestosDgiDto.fechapago;
    
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
