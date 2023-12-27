import { Inject, Injectable } from '@nestjs/common';
import { CreatePagoAnticipadoDto } from './dto/create-pago-anticipado.dto';
import { UpdatePagoAnticipadoDto } from './dto/update-pago-anticipado.dto';
import { PagoAnticipado } from './entities/pago-anticipado.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PagoAnticipadosService {
  constructor(
    @Inject('PAGOANTICIPADO_REPOSITORY')
    private pagoRepository: Repository<PagoAnticipado>,
  ) {}
  create(createPagoAnticipadoDto: CreatePagoAnticipadoDto) {
    return 'This action adds a new pagoAnticipado';
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
  findAllByCliente(idcliente: string) {
    const listPagos: PagoAnticipado[] = await this.pagoRepository.createQueryBuilder('pago')
    .innerJoinAndSelect('pago.cliente','cliente')  
     
    .where('cliente.id >= :idcliente',{idcliente: idcliente }) 
   
    .getMany();
  }
}
