import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreatePagoAnticipadoDto } from './dto/create-pago-anticipado.dto';
import { UpdatePagoAnticipadoDto } from './dto/update-pago-anticipado.dto';
import { PagoAnticipado } from './entities/pago-anticipado.entity';
import { Repository } from 'typeorm';
import { Cliente } from '../cliente/entities/cliente.entity';
import { Status } from '../../EntityStatus/entity.estatus.enum';
import { CuentasEmpresa } from '../cuentas-empresa/entities/cuentas-empresa.entity';

@Injectable()
export class PagoAnticipadosService {
  constructor(
    @Inject('PAGOANTICIPADO_REPOSITORY')
    private pagoRepository: Repository<PagoAnticipado>,
    @Inject('CLIENTE_REPOSITORY')
    private clienteRepository: Repository<Cliente>,
    @Inject('CUENTAEMPRESA_REPOSITORY')
    private cuentaRepository: Repository<CuentasEmpresa>,
  ) {}
 

 async create(createPagoAnticipadoDto: CreatePagoAnticipadoDto): Promise<PagoAnticipado> {
    const findCliente: Cliente = await this.clienteRepository.findOne({where:{id: createPagoAnticipadoDto.idcliente, status: Status.ACTIVO}})
   if(!findCliente){
    throw new BadRequestException("El Cliente Introducido no es valido");
   }

   const foundCuenta: CuentasEmpresa = await this.cuentaRepository.findOne({
    where: { id: createPagoAnticipadoDto.idcuenta, status: Status.ACTIVO },
  });

  if (!foundCuenta) {
    throw new NotFoundException(
      'La cuenta de la Empresa introducida no es correcta o está desahabilitada',
    );
  }
   const newPago: PagoAnticipado = new PagoAnticipado();
   newPago.cliente = findCliente;
   newPago.numerocheque = createPagoAnticipadoDto.numerocheque;
   newPago.numeroTransferencia = createPagoAnticipadoDto.numeroTransferencia;
   newPago.pago = createPagoAnticipadoDto.pago;
   newPago.cuenta = foundCuenta;
   const savedPago: PagoAnticipado = await this.pagoRepository.save(newPago);
   if(!savedPago){
    throw new BadRequestException("Error al generar el pago anticipado")
   }
   findCliente.credito.monto = parseFloat(findCliente.credito.monto.toString()) + parseFloat(savedPago.pago.toString());
   await this.clienteRepository.save(findCliente);
    return savedPago;
  }

  findAll() {
    return `This action returns all pagoAnticipados`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pagoAnticipado`;
  }

  update(id: number, updatePagoAnticipadoDto: UpdatePagoAnticipadoDto) {
    return `This action updates a #${id} pagoAnticipado`;
  }

  remove(id: number) {
    return `This action removes a #${id} pagoAnticipado`;
  }
 async findAllByCliente(idcliente: string):Promise<PagoAnticipado[]> {
    return  await this.pagoRepository.createQueryBuilder('pago')
    .innerJoinAndSelect('pago.cliente','cliente') 
    .innerJoinAndSelect('pago.cuenta','cuenta') 
    .innerJoinAndSelect('cuenta.moneda','moneda')   
     
    .where('cliente.id >= :idcliente',{idcliente: idcliente }) 
   
    .getMany();

  }
}
