import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCotizacionDto } from './dto/create-cotizacion.dto';
import { UpdateCotizacionDto } from './dto/update-cotizacion.dto';
import { Double, Repository } from 'typeorm';
import { Proyecto } from '../proyecto/entities/proyecto.entity';
import {Cotizacion } from './entities/cotizacion.entity';
import { PreFactura } from '../pre-factura/entities/pre-factura.entity';


@Injectable()
export class CotizacionService {
  constructor(
 
    @Inject('PROYECTO_REPOSITORY')
    private proyectoRepository: Repository<Proyecto>,
    @Inject('COTIZACION_REPOSITORY')
    private cotizacionRepository: Repository<Cotizacion>,
    @Inject('PREFACTURA_REPOSITORY')
    private preFacturaRepository: Repository<PreFactura>,

  
   
  ) {}
 async create(createCotizacionDto: CreateCotizacionDto): Promise<Cotizacion> {
   
    const foundProyecto: Proyecto = await this.proyectoRepository.findOne({where:{id: createCotizacionDto.proyectoId}});
    if (!foundProyecto) {
      throw new NotFoundException('El proyecto no existe');
    }
    const newcotizacion: Cotizacion = new Cotizacion();
    newcotizacion.UM = createCotizacionDto.UM;
    newcotizacion.cantidad = createCotizacionDto.cantidad;
    newcotizacion.importe = createCotizacionDto.cantidad * createCotizacionDto.precio;    
    newcotizacion.nombreServicio = createCotizacionDto.nombreServicio;
    newcotizacion.precio = createCotizacionDto.precio; 
    newcotizacion.proyecto = foundProyecto; 
    newcotizacion.valorimpuesto = createCotizacionDto.valorimpuesto;   
    newcotizacion.importeimpuesto = newcotizacion.importe * createCotizacionDto.valorimpuesto ;
    newcotizacion.valortotal = newcotizacion.importeimpuesto + newcotizacion.importe;
    newcotizacion.subtotal = createCotizacionDto.precio * createCotizacionDto.cantidad; 
  
   const savedCotizacion: Cotizacion = await this.cotizacionRepository.save(newcotizacion);
   if(!savedCotizacion){
    throw new NotFoundException('Error al Insertar');
   }
   if(foundProyecto.ajuste){
    const preFactura: PreFactura = new PreFactura();
    preFactura.UM = newcotizacion.UM;
    preFactura.cantidad = newcotizacion.cantidad;
    preFactura.importe = newcotizacion.importe;
    preFactura.importeimpuesto = newcotizacion.importeimpuesto;
    preFactura.nombreServicio = newcotizacion.nombreServicio;
    preFactura.precio = newcotizacion.precio;
    preFactura.proyecto = foundProyecto;
    preFactura.valorimpuesto = newcotizacion.valorimpuesto;
    preFactura.valortotal = newcotizacion.valortotal;
    await this.preFacturaRepository.save(preFactura);
 
    }

    return savedCotizacion;
  }

  findAll() {
    return `This action returns all cotizacion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cotizacion`;
  }

  update(id: number, updateCotizacionDto: UpdateCotizacionDto) {
    return `This action updates a #${id} cotizacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} cotizacion`;
  }
}
