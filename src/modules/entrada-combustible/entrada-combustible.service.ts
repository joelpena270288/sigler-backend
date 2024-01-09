import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateEntradaCombustibleDto } from './dto/create-entrada-combustible.dto';
import { UpdateEntradaCombustibleDto } from './dto/update-entrada-combustible.dto';
import { EntradaCombustible } from './entities/entrada-combustible.entity';
import { Repository } from 'typeorm';
import { Combustible } from '../combustible/entities/combustible.entity';
import { Status } from '../../EntityStatus/entity.estatus.enum';

@Injectable()
export class EntradaCombustibleService {
  constructor(
    @Inject('COMBUSTIBLE_REPOSITORY')
    private combustibleRepository: Repository<Combustible>,
    @Inject('ENTRADACOMBUSTIBLE_REPOSITORY')
    private entradaCombustibleRepository: Repository<EntradaCombustible>,
  ) {}
  async create(
    createEntradaCombustibleDto: CreateEntradaCombustibleDto,
  ): Promise<EntradaCombustible> {
    const foundCombustible: Combustible =
      await this.combustibleRepository.findOne({
        where: {
          id: createEntradaCombustibleDto.idcombustible
         
        }
      });
    if (!foundCombustible) {
      throw new BadRequestException(
        'El combustible intrododucido no es valido',
      );
    }
    const newEntrada: EntradaCombustible = new EntradaCombustible();
    newEntrada.NCF =  'B'+ createEntradaCombustibleDto.NCF;
    newEntrada.Nombre = createEntradaCombustibleDto.Nombre;
    newEntrada.RNC = createEntradaCombustibleDto.RNC;
    newEntrada.combustible = foundCombustible;
    newEntrada.direccion = createEntradaCombustibleDto.direccion;
    newEntrada.factura = createEntradaCombustibleDto.factura;
    newEntrada.fecha = createEntradaCombustibleDto.fecha;
    newEntrada.galones = createEntradaCombustibleDto.galones;
    newEntrada.importe = createEntradaCombustibleDto.importe;
    newEntrada.importeimpuesto = createEntradaCombustibleDto.importeimpuesto;
    newEntrada.status = Status.ACTIVO;
    newEntrada.valortotal =
      parseFloat(newEntrada.importe.toString()) +
      parseFloat(newEntrada.importeimpuesto.toString());

    const savedEntrada: EntradaCombustible =
      await this.entradaCombustibleRepository.save(newEntrada);
    if (!savedEntrada) {
      throw new BadRequestException('Error al crear la entrada de combustible');
    }
    foundCombustible.capacidadTanque.capacidad =
      parseFloat(foundCombustible.capacidadTanque.capacidad.toString()) +
      parseFloat(createEntradaCombustibleDto.galones.toString());
    foundCombustible.capacidadTanque.updatedAt = new Date();
    await this.combustibleRepository.save(foundCombustible);
    return savedEntrada;
  }

  async findAll(): Promise<EntradaCombustible[]> {
    return await this.entradaCombustibleRepository.find({
      where: { status: Status.ACTIVO },
    });
  }

  async findOne(id: string): Promise<EntradaCombustible> {
    return await this.entradaCombustibleRepository.findOne({
      where: { id: id, status: Status.ACTIVO },
      relations: {
        combustible: true
      }
    });
  }

  update(id: number, updateEntradaCombustibleDto: UpdateEntradaCombustibleDto) {
    return `This action updates a #${id} entradaCombustible`;
  }

  async remove(id: string): Promise<EntradaCombustible> {
    const foundentrada = await this.entradaCombustibleRepository.findOne({
      where: { id: id, status: Status.ACTIVO },
    });
    if (!foundentrada) {
      throw new BadRequestException(
        'La Entrada de combustible intrododucida no es valida',
      );
    }
    foundentrada.status = Status.INACTIVO;
    const foundCombustible: Combustible =
      await this.combustibleRepository.findOne({
        where: { id: foundentrada.combustible.id },
      });
    foundCombustible.capacidadTanque.capacidad =
      parseFloat(foundCombustible.capacidadTanque.capacidad.toString()) -
      parseFloat(foundentrada.galones.toString());
      foundCombustible.capacidadTanque.updatedAt = new Date();
    await this.combustibleRepository.save(foundCombustible);

    return this.entradaCombustibleRepository.save(foundentrada);
  }
}
