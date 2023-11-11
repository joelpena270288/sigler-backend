import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateServicioProcesadoDto } from './dto/create-servicio-procesado.dto';
import { UpdateServicioProcesadoDto } from './dto/update-servicio-procesado.dto';
import { Repository } from 'typeorm';
import { ServicioProcesado } from './entities/servicio-procesado.entity';
import { PreFactura } from '../pre-factura/entities/pre-factura.entity';


@Injectable()
export class ServicioProcesadoService {

  constructor(
    @Inject('SERVICIOPROCESADO_REPOSITORY')
    private servicioProcesadoRepository: Repository<ServicioProcesado>,
    @Inject('PREFACTURA_REPOSITORY')
    private preFacturaRepository: Repository<PreFactura>,
  ) {}
  create(createServicioProcesadoDto: CreateServicioProcesadoDto) {
    return 'This action adds a new servicioProcesado';
  }

  findAll() {
    return `This action returns all servicioProcesado`;
  }

  findOne(id: string) {
    return `This action returns a #${id} servicioProcesado`;
  }

 async update(id: string, updateServicioProcesadoDto: UpdateServicioProcesadoDto): Promise<ServicioProcesado> {
   
  
  const servicioFound: ServicioProcesado = await this.servicioProcesadoRepository.findOne({where:{id: id}});
    if(!servicioFound){
      throw new NotFoundException("No esxite el servicio en la bd");
    }
     if(updateServicioProcesadoDto.cantidad == servicioFound.cantidad){
      throw new BadRequestException("No hay cambio en la cantidad");
     }
    const foundPrefactura: PreFactura = await this.preFacturaRepository.findOne({where:{id: servicioFound.idprefactura}});
   
    if(updateServicioProcesadoDto.cantidad > servicioFound.cantidad ){
      const dif: number = updateServicioProcesadoDto.cantidad - servicioFound.cantidad;
      if(dif> foundPrefactura.cantidad){
        throw new BadRequestException("La cantidad disponible es menor a la introducida");
      }

      foundPrefactura.cantidad -= dif;
      foundPrefactura.updatedAt = new Date();
      
     

    }else if(updateServicioProcesadoDto.cantidad < servicioFound.cantidad ) {
     const sum: number =  servicioFound.cantidad - updateServicioProcesadoDto.cantidad;
    
     foundPrefactura.cantidad += sum;
     foundPrefactura.updatedAt = new Date();
    
    }
    //Actualizando los servicios de las prefacturas

    foundPrefactura.importe = foundPrefactura.cantidad * foundPrefactura.precio;
    foundPrefactura.importeimpuesto = foundPrefactura.importe * foundPrefactura.valorimpuesto;
    foundPrefactura.valortotal = foundPrefactura.importe + foundPrefactura.importeimpuesto;
   
    await this.preFacturaRepository.save(foundPrefactura);

    servicioFound.importe = servicioFound.cantidad * servicioFound.precio;
    servicioFound.importeimpuesto = servicioFound.importe * servicioFound.valorimpuesto;
    servicioFound.valortotal = servicioFound.importe + servicioFound.importeimpuesto;

    return this.servicioProcesadoRepository.save(servicioFound);

    } 


 async remove(id: string): Promise<ServicioProcesado> {

  const servicioFound: ServicioProcesado = await this.servicioProcesadoRepository.findOne({where:{id: id}});
  if(!servicioFound){
    throw new NotFoundException("No esxite el servicio en la bd");
  }
  const foundPrefactura: PreFactura = await this.preFacturaRepository.findOne({where:{id: servicioFound.idprefactura}});
   
  foundPrefactura.cantidad += servicioFound.cantidad;
  foundPrefactura.importe = foundPrefactura.cantidad * foundPrefactura.precio;
  foundPrefactura.importeimpuesto = foundPrefactura.importe * foundPrefactura.valorimpuesto;
  foundPrefactura.valortotal = foundPrefactura.importe + foundPrefactura.importeimpuesto;
  const savedPrefactura: PreFactura = await this.preFacturaRepository.save(foundPrefactura);
  if(!savedPrefactura){
    throw new BadRequestException("Error al editar servicio");
  }
 
 await this.servicioProcesadoRepository.delete(servicioFound);
 return servicioFound;
  }
  
}
