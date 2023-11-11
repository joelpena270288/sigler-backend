import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';
import { Contacto } from '../contacto/entities/contacto.entity';
import { Status } from '../../EntityStatus/entity.estatus.enum';


@Injectable()
export class ClienteService {
  constructor(
    @Inject('CLIENTE_REPOSITORY')
    private clienteRepository: Repository<Cliente>,
  ) {}

  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    const findCliente = await this.clienteRepository.findOne({
      where: { nombre: createClienteDto.nombre },
    });

    if (findCliente) {
      throw new ConflictException('El Cliente ya existe');
    }

    const cliente: Cliente = new Cliente();
    cliente.nombre = createClienteDto.nombre;
    cliente.direccion = createClienteDto.direccion;
    cliente.telefono = createClienteDto.telefono;
    cliente.rcn = createClienteDto.rcn;

    return await this.clienteRepository.save(cliente);
  }

  async findAll(): Promise<Cliente[]> {
    return await this.clienteRepository.find({ where: { status: Status.ACTIVO } });
  }

 async findOne(id: string) {
    return await this.clienteRepository.find({ where: { id: id } });
  }

 async update(id: string, updateClienteDto: UpdateClienteDto): Promise<Cliente> {
  const findCliente = await this.clienteRepository.findOne({
    where: { id: id, status: Status.ACTIVO },
  });
  if(!findCliente){
    throw new NotFoundException("El cliente no existe");

  }
  findCliente.nombre = updateClienteDto.nombre;
  findCliente.direccion = updateClienteDto.direccion;
  findCliente.telefono = updateClienteDto.telefono;
  findCliente.rcn = updateClienteDto.rcn;
    return await this.clienteRepository.save(findCliente);
  }

 async remove(id: string) {
    const findCliente = await this.clienteRepository.findOne({
      where: { id: id, status: Status.ACTIVO },
    });
    if(!findCliente){
      throw new NotFoundException("El cliente no existe");
  
    }
    findCliente.status = Status.INACTIVO;
    return await this.clienteRepository.save(findCliente);
  }
}
