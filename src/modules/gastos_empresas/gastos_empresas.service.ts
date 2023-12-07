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

@Injectable()
export class GastosEmpresasService {
  constructor(
    @Inject('GASTOEMPRESA_REPOSITORY')
    private gastoRepository: Repository<GastosEmpresa>,
    @Inject('PROYECTO_REPOSITORY')
    private proyectoRepository: Repository<Proyecto>,
    @Inject('GASTOITEM_REPOSITORY')
    private itemsRepository: Repository<GastoItem>,
  ) {}
  async create(
    createGastosEmpresaDto: CreateGastosEmpresaDto,
  ): Promise<GastosEmpresa> {
    const cuentaporpagar: CuentasPorPagarEmpresa = new CuentasPorPagarEmpresa();
    const gasto: GastosEmpresa = new GastosEmpresa();
    gasto.Nombre = createGastosEmpresaDto.Nombre;
    gasto.NCF = createGastosEmpresaDto.NCF.toUpperCase();
    gasto.RNC = createGastosEmpresaDto.RNC.toUpperCase();
    gasto.direccion = createGastosEmpresaDto.direccion;
    gasto.factura = createGastosEmpresaDto.factura.toUpperCase();
    gasto.cuentaporpagar = cuentaporpagar;

    if (createGastosEmpresaDto.idproyecto !== '') {
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
        try {
          await this.itemsRepository.save(gasto_item);
        } catch (error) {
          console.log(error);
        }

        valorTotal = valorTotal + parseFloat(gasto_item.valortotal.toString());
      }
    }

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
      .leftJoinAndSelect('gasto.pagos', 'pagos')
     // .leftJoinAndSelect('pagos.cuenta', 'cuenta')
     // .leftJoinAndSelect('cuenta.moneda', 'moneda')
     // .leftJoinAndSelect('gasto.gastosItems', 'gastosItems')
     .where('gasto.id = :id', { id: id})
     .andWhere('gasto.status = :estadogasto', { estadogasto: StatusGasto.ACTIVO })
     .andWhere('pagos.status = :estadopago', { estadopago: Status.ACTIVO })

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
