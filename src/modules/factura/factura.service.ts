import { Inject, Injectable, NotFoundException,BadRequestException } from '@nestjs/common';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';
import { Repository,Not } from 'typeorm';
import { Factura } from './entities/factura.entity';
import { StatusFactura } from './entities/fatura-status.enum';
import {Proyecto} from '../proyecto/entities/proyecto.entity';
import { PreFactura } from '../pre-factura/entities/pre-factura.entity';
import { ServicioProcesado } from '../servicio-procesado/entities/servicio-procesado.entity';
import { TipoFactura } from './entities/factura-tipo.enum';
@Injectable()
export class FacturaService {

  constructor(
    @Inject('FACTURA_REPOSITORY')
    private facturaRepository: Repository<Factura>,
    @Inject('PROYECTO_REPOSITORY')
    private proyectoRepository: Repository<Proyecto>,
    @Inject('PREFACTURA_REPOSITORY')
    private prefacturaRepository: Repository<PreFactura>,
    @Inject('SERVICIOPROCESADO_REPOSITORY')
    private servicioProcesadoRepository: Repository<ServicioProcesado>,
   
  ){}
 async create(createFacturaDto: CreateFacturaDto): Promise<Factura> {

  const foundProyecto: Proyecto = await this.proyectoRepository.findOne({where:{id: createFacturaDto.idProyecto}});
 if(!foundProyecto){
  throw new NotFoundException("No existe el proyecto");
 }
 const newFactura: Factura = new Factura();
 newFactura.tipo = TipoFactura.PREFACTURA;
 newFactura.status = StatusFactura.CREADA;
 newFactura.proyecto = foundProyecto;
 const savedFactura: Factura = await this.facturaRepository.save(newFactura);
 if(!savedFactura){
  throw new NotFoundException("Error al crear la Prefactura");
 }
 for (let index = 0; index < createFacturaDto.prefacturas.length; index++) {
  const foundPreFactura: PreFactura = await this.prefacturaRepository.findOne({where:{id: createFacturaDto.prefacturas[index].id}});
  if(foundPreFactura){
   if(foundPreFactura.cantidad >= createFacturaDto.prefacturas[index].cantidad){
	   
    foundPreFactura.cantidad = foundPreFactura.cantidad -  createFacturaDto.prefacturas[index].cantidad;
     const servicioProcesado: ServicioProcesado = new ServicioProcesado();
      servicioProcesado.UM = foundPreFactura.UM;
      servicioProcesado.cantidad = createFacturaDto.prefacturas[index].cantidad;
      servicioProcesado.importe = foundPreFactura.precio *   servicioProcesado.cantidad;
      servicioProcesado.importeimpuesto = servicioProcesado.importe * foundPreFactura.valorimpuesto;
      servicioProcesado.nombreServicio = foundPreFactura.nombreServicio;
      servicioProcesado.precio = foundPreFactura.precio;
      servicioProcesado.valorimpuesto = foundPreFactura.valorimpuesto;
      servicioProcesado.valortotal =  servicioProcesado.importe +  servicioProcesado.importeimpuesto;
      servicioProcesado.factura = savedFactura;
      servicioProcesado.idprefactura = foundPreFactura.id;

     const savedServicio: ServicioProcesado =  await this.servicioProcesadoRepository.save(servicioProcesado);
      if(savedServicio){
        foundPreFactura.importe = foundPreFactura.cantidad;
        foundPreFactura.importeimpuesto = foundPreFactura.importe * foundPreFactura.valorimpuesto;
        foundPreFactura.valortotal = foundPreFactura.importe +  foundPreFactura.importeimpuesto;
        await this.prefacturaRepository.save(foundPreFactura);
      }

   }else {
	   throw new BadRequestException("La cantidad suministrada es mayor a la disponible");
   }

  }


 }

return savedFactura;
  
  }
 
 async findAll(): Promise<Factura[]> {
       return await this.facturaRepository.find({
      relations: {
        proyecto: true
		
        
    },
	
	where:{
		status: Not(StatusFactura.CANCELADA)
	}
    
    });
  }

 async findOne(id: string) {
    return await this.facturaRepository.findOne({
      relations: {
        servicioProcesado: true,
		proyecto: true
		
		
        
    },
	where:{
		id: id,
		status: Not(StatusFactura.CANCELADA)
	}
    
    });
  }

  update(id: number, updateFacturaDto: UpdateFacturaDto) {
    return `This action updates a #${id} factura`;
  }

  remove(id: number) {
    return `This action removes a #${id} factura`;
  }
 async aprobar(id: string):Promise<Factura>{

 const foundFactura: Factura = await this.facturaRepository.findOne({where:{id: id, status: StatusFactura.CREADA}});
  
 if(!foundFactura){
    throw new NotFoundException('La factura no existe o esta aprobada');
  }
  foundFactura.status = StatusFactura.APROBADA;
  return await this.facturaRepository.save(foundFactura);

  }
 
}
