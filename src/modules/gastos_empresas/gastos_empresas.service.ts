import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGastosEmpresaDto } from './dto/create-gastos_empresa.dto';
import { UpdateGastosEmpresaDto } from './dto/update-gastos_empresa.dto';
import { GastosEmpresa } from './entities/gastos_empresa.entity';
import { Empresa } from '../empresa/entities/empresa.entity';
import { CuentasPorPagarEmpresa } from './entities/cuenta-por-pagar-empresa.entity';
import { Status } from '../../EntityStatus/entity.estatus.enum';
import { Not, Repository } from 'typeorm';
import { Proyecto } from '../proyecto/entities/proyecto.entity';

import { StatusProyecto } from '../proyecto/status.enum';
import { GastoItem } from '../gasto_item/entities/gasto_item.entity';
import { StatusGasto } from './entities/gasto-status.enum';
import { Equipo } from '../equipos/entities/equipo.entity';
import { Provedor } from '../provedor/entities/provedor.entity';

@Injectable()
export class GastosEmpresasService {
  constructor(
    @Inject('GASTOEMPRESA_REPOSITORY')
    private gastoRepository: Repository<GastosEmpresa>,
    @Inject('PROYECTO_REPOSITORY')
    private proyectoRepository: Repository<Proyecto>,
    @Inject('GASTOITEM_REPOSITORY')
    private itemsRepository: Repository<GastoItem>,
    @Inject('EQUIPO_REPOSITORY')
    private equipoRepository: Repository<Equipo>,
    @Inject('PROVEDOR_REPOSITORY')
    private provedorRepository: Repository<Provedor>,
  ) {}
  async create(
    createGastosEmpresaDto: CreateGastosEmpresaDto,
  ): Promise<GastosEmpresa> {
    const foundProvedor: Provedor = await this.provedorRepository.findOne({where:{id: createGastosEmpresaDto.idprovedor}});
   if(!foundProvedor){
    throw new NotFoundException("No existe el provedor");

   }
  
    const cuentaporpagar: CuentasPorPagarEmpresa = new CuentasPorPagarEmpresa();
    const gasto: GastosEmpresa = new GastosEmpresa();
    gasto.provedor = foundProvedor;
    gasto.descripcion = createGastosEmpresaDto.descripcion;
   
    gasto.NCF = 'B' + createGastosEmpresaDto.NCF.toUpperCase();    
    gasto.factura = createGastosEmpresaDto.factura.toUpperCase();
    gasto.cuentaporpagar = cuentaporpagar;
    gasto.tipoPago = createGastosEmpresaDto.tipopago;
    gasto.impuestoselectivoconsumo = createGastosEmpresaDto.impuestoselectivoconsumo;
    gasto.propina = createGastosEmpresaDto.propina;
    gasto.createdAt = createGastosEmpresaDto.fecha;
    if (createGastosEmpresaDto.idproyecto !== null) {
      const foundProyecto: Proyecto = await this.proyectoRepository.findOne({
        where: {
          status: Not(StatusProyecto.CANCELADO),
          id: createGastosEmpresaDto.idproyecto,
        },
      });
      if (!foundProyecto) {
        throw new BadRequestException('El proyecto introducido no es valido');
      } else {
        gasto.proyecto = foundProyecto;
      }
    }
 
    const creategasto: GastosEmpresa = await this.gastoRepository.save(gasto);
    if (!creategasto) {
      throw new BadRequestException('Error al generar el gasto');
    }

    if (createGastosEmpresaDto.items.length < 1) {
      throw new BadRequestException(
        'No hay una lista de productos en el gasto',
      );
    }
    let valorTotal = 0;

    for (let index = 0; index < createGastosEmpresaDto.items.length; index++) {
      if (
        parseFloat(createGastosEmpresaDto.items[index].cantidad.toString()) >
          0 &&
        parseFloat(createGastosEmpresaDto.items[index].importe.toString()) > 0
      ) {
        const gasto_item: GastoItem = new GastoItem();
        gasto_item.descripcion =
          createGastosEmpresaDto.items[index].descripcion;
        gasto_item.importe = createGastosEmpresaDto.items[index].importe;
        gasto_item.importeimpuesto =
          createGastosEmpresaDto.items[index].importeimpuesto;
        gasto_item.cantidad = createGastosEmpresaDto.items[index].cantidad;
        gasto_item.valortotal =
          parseFloat(gasto_item.importe.toString()) +
          parseFloat(gasto_item.importeimpuesto.toString());
        gasto_item.gasto = creategasto;
        gasto_item.preciounitario = createGastosEmpresaDto.items[index].preciounitario;
        gasto_item.createdAt = createGastosEmpresaDto.fecha;
        if (createGastosEmpresaDto.items[index].idequipo !== null) {
          const foundEquipo: Equipo = await this.equipoRepository.findOne({
            where: {
              status: Not(StatusProyecto.CANCELADO),
              id: createGastosEmpresaDto.items[index].idequipo,
            },
          });
          if (!foundEquipo) {
            throw new BadRequestException('El equipo introducido no es valido');
          } else {
            gasto_item.equipo = foundEquipo;
          }
        }
        try {
          await this.itemsRepository.save(gasto_item);
        } catch (error) {
          console.log(error);
        }

        valorTotal = valorTotal + parseFloat(gasto_item.valortotal.toString());
      }
    }
    valorTotal = parseFloat(valorTotal.toString())  + ( parseFloat(createGastosEmpresaDto.impuestoselectivoconsumo.toString()) + parseFloat (createGastosEmpresaDto.propina.toString()));
    cuentaporpagar.montoinicial = valorTotal;
    cuentaporpagar.montorestante = valorTotal;

    creategasto.cuentaporpagar = cuentaporpagar;

    const savedGasto: GastosEmpresa =
      await this.gastoRepository.save(creategasto);
    if (!savedGasto) {
      throw new BadRequestException('Error al generar el gasto');
    }

    return savedGasto;
  }

  async findAll(): Promise<GastosEmpresa[]> {
    return await this.gastoRepository.find({
      relations: {
        cuentaporpagar: true,
        proyecto: true,
        gastosItems: true,
        provedor: true,
      },

      where: {
        status: Not(StatusGasto.CANCELADO),
      },
    });
  }
  async findAllCuentasPorPagar(): Promise<GastosEmpresa[]> {
    return await this.gastoRepository.find({
      relations: {
        cuentaporpagar: true,
        proyecto: true,
        gastosItems: true,
      },

      where: {
        status: StatusGasto.ACTIVO,
      },
    });
  }

  async findOne(id: string): Promise<GastosEmpresa> {
    return await this.gastoRepository
      .createQueryBuilder('gasto')
      .leftJoinAndSelect('gasto.proyecto', 'proyecto')
      .leftJoinAndSelect('proyecto.cliente', 'cliente')
      .innerJoinAndSelect('gasto.cuentaporpagar', 'cuentaporpagar')
      .leftJoinAndSelect('gasto.pagos', 'pago','pago.status = :estadopago', { estadopago: Status.ACTIVO })
      .leftJoinAndSelect('pago.cuenta', 'cuenta')
      .leftJoinAndSelect('cuenta.moneda', 'moneda')
      .leftJoinAndSelect('gasto.gastosItems', 'gastoItem', 'gastoItem.status = :estadoitem',{estadoitem: Status.ACTIVO})
      .leftJoinAndSelect('gastoItem.equipo', 'equipo')
     .where('gasto.id = :id', { id: id})
     .andWhere('gasto.status != :estadogasto', { estadogasto: StatusGasto.CANCELADO })
    

      .getOne();

    /*
    return await this.gastoRepository.findOne({
      relations: {
        cuentaporpagar: true,
		proyecto: true,
		gastosItems: true
		
        
    },
	
	where:{
		status: Not(StatusGasto.CANCELADO),
		id: id
	}
    
    });*/
  }

  update(id: number, updateGastosEmpresaDto: UpdateGastosEmpresaDto) {
    return `This action updates a #${id} gastosEmpresa`;
  }

  async remove(id: string): Promise<GastosEmpresa> {
    const foundGasto: GastosEmpresa = await this.gastoRepository.findOne({
      where: { id: id, status: Not(StatusGasto.CANCELADO) },
    });
    if (!foundGasto) {
      throw new NotFoundException(
        'No existe el gasto o fue cancelado anteriormente',
      );
    }
    foundGasto.status = StatusGasto.CANCELADO;

    return await this.gastoRepository.save(foundGasto);
  }
}
