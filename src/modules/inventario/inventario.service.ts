import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateInventarioDto } from './dto/create-inventario.dto';
import { UpdateInventarioDto } from './dto/update-inventario.dto';
import { Repository } from 'typeorm';
import { Inventario } from './entities/inventario.entity';
import { Equipo } from '../equipos/entities/equipo.entity';
import {FiltroFechaDto} from './dto/filtro-fecha.dto'

@Injectable()
export class InventarioService {
  constructor(
    @Inject('INVENTARIO_REPOSITORY')
    private inventarioRepository: Repository<Inventario>,
    @Inject('EQUIPO_REPOSITORY')
    private equipoRepository: Repository<Equipo>,
  ) {}
 async create(createInventarioDto: CreateInventarioDto): Promise<Inventario> {
   const foundEquipo: Equipo = await this.equipoRepository.findOne({where:{id: createInventarioDto.idequipo}})
  if(!foundEquipo){
    throw new NotFoundException('El equipo no es valido');

  }
 const inventario: Inventario = new Inventario();
 inventario.cantidad = createInventarioDto.cantidad;
 inventario.descripcion = createInventarioDto.descripcion;
 inventario.equipo = foundEquipo;
 inventario.nombre = createInventarioDto.nombre;
 inventario.serie = createInventarioDto.serie;
return await this.inventarioRepository.save(inventario);

  }

  findAll() {
    return `This action returns all inventario`;
  }

 async findOne(id: string, filtroFechaDto: FiltroFechaDto):Promise<Invetario[]> {
   
    const inventarios: Inventario[] = await this.inventarioRepository
      .createQueryBuilder('inventario')
      .innerJoinAndSelect(
        'inventario.equipo',

        'equipo',
        'equipo.id = :idequipo',
        { idequipo: id },
      )
     
      .where('inventario.createdAt >= :start', {
        start: filtroFechaDto.start + ' 00:00:00',
      })
      .andWhere('inventario.createdAt  <= :end', {
        end: filtroFechaDto.end + ' 23:59:00',
      })
    
      .getMany();


  }

  update(id: number, updateInventarioDto: UpdateInventarioDto) {
    return `This action updates a #${id} inventario`;
  }

 async remove(id: string): Promise<Inventario> {
   const founInventario: Inventario = await this.inventarioRepository.findOne({where: {id: id}});
   if(!founInventario){
    throw new NotFoundException("No existe el inventario");
   }
    return this.inventarioRepository.remove(founInventario);
  }
}
