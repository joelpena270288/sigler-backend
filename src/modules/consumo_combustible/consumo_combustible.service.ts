import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateConsumoCombustibleDto } from './dto/create-consumo_combustible.dto';
import { UpdateConsumoCombustibleDto } from './dto/update-consumo_combustible.dto';
import { ConsumoCombustible } from './entities/consumo_combustible.entity';
import { Not, Repository } from 'typeorm';
import { Proyecto } from '../proyecto/entities/proyecto.entity';
import { Equipo } from '../equipos/entities/equipo.entity';
import { Combustible } from '../combustible/entities/combustible.entity';
import { Status } from '../../EntityStatus/entity.estatus.enum';
import { StatusProyecto } from '../proyecto/status.enum';

@Injectable()
export class ConsumoCombustibleService {
  constructor(
    @Inject('PROYECTO_REPOSITORY')
    private proyectoRepository: Repository<Proyecto>,
    @Inject('EQUIPO_REPOSITORY')
    private equipoRepository: Repository<Equipo>,
    @Inject('COMBUSTIBLE_REPOSITORY')
    private combustibleRepository: Repository<Combustible>,
    @Inject('CONSUMOCOMBUSTIBLE_REPOSITORY')
    private consumoCombustibleRepository: Repository<ConsumoCombustible>,
  ) {}
  async create(
    createConsumoCombustibleDto: CreateConsumoCombustibleDto,
  ): Promise<ConsumoCombustible> {
    const newConsumoCombustible: ConsumoCombustible = new ConsumoCombustible();
 
    const foundEquipo: Equipo = await this.equipoRepository.findOne({
      where: {
        id: createConsumoCombustibleDto.idequipo,
        status: Status.ACTIVO,
      },
    });
    if (!foundEquipo) {
      throw new NotFoundException('El equipo introducido no esta disponible');
    }
    if (createConsumoCombustibleDto.idproyecto !== '') {
      const foundproyecto: Proyecto = await this.proyectoRepository.findOne({
        where: {
          id: createConsumoCombustibleDto.idproyecto,
          status: Not(StatusProyecto.CANCELADO),
        },
      });
      if (!foundproyecto) {
        throw new NotFoundException('El proyecto introducido no es valido');
      }
      newConsumoCombustible.proyecto = foundproyecto;
      newConsumoCombustible.nombreProyecto = foundproyecto.name;
      newConsumoCombustible.cliente = foundproyecto.cliente.nombre;
    }
    const foundCombustible: Combustible =
      await this.combustibleRepository.findOne({
        where: { id: createConsumoCombustibleDto.idcombustible },
      });
    if (!foundCombustible) {
      throw new NotFoundException('El Combustible introducido no es valido');
    }
    newConsumoCombustible.equipo = foundEquipo;
    newConsumoCombustible.Nombre = createConsumoCombustibleDto.Nombre;
    newConsumoCombustible.NCF = 'B'+ createConsumoCombustibleDto.NCF;
    newConsumoCombustible.RNC = createConsumoCombustibleDto.RNC;
    newConsumoCombustible.direccion = createConsumoCombustibleDto.direccion;
    newConsumoCombustible.factura = createConsumoCombustibleDto.factura;
    newConsumoCombustible.fecha = createConsumoCombustibleDto.fecha;
    newConsumoCombustible.galones = parseFloat(
      createConsumoCombustibleDto.galones.toString(),
    );
    newConsumoCombustible.importe = parseFloat(
      createConsumoCombustibleDto.importe.toString(),
    );
    newConsumoCombustible.importeimpuesto = parseFloat(
      createConsumoCombustibleDto.importeimpuesto.toString(),
    );
    newConsumoCombustible.valortotal =
      parseFloat(newConsumoCombustible.importe.toString()) +
      parseFloat(newConsumoCombustible.importeimpuesto.toString());
    newConsumoCombustible.combustible = foundCombustible.name;

    return await this.consumoCombustibleRepository.save(newConsumoCombustible);
  }

  async findAll(): Promise<ConsumoCombustible[]> {
    return await this.consumoCombustibleRepository.find({
      relations: {
        equipo: true,
      },
      where: {
        status: Status.ACTIVO,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} consumoCombustible`;
  }

  update(id: number, updateConsumoCombustibleDto: UpdateConsumoCombustibleDto) {
    return `This action updates a #${id} consumoCombustible`;
  }

  async remove(id: string): Promise<ConsumoCombustible> {
    const foundConsumoCombustible: ConsumoCombustible =
      await this.consumoCombustibleRepository.findOne({
        where: { id: id, status: Status.ACTIVO },
      });
    if (!foundConsumoCombustible) {
      throw new NotFoundException('El consumo introducido no es valido');
    }
    foundConsumoCombustible.status = Status.INACTIVO;

    return await this.consumoCombustibleRepository.save(
      foundConsumoCombustible,
    );
  }
}
