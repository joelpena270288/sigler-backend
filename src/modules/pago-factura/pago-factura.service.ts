import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePagoFacturaDto } from './dto/create-pago-factura.dto';
import { UpdatePagoFacturaDto } from './dto/update-pago-factura.dto';
import { Not, Repository } from 'typeorm';
import { PagoFactura } from './entities/pago-factura.entity';
import { Factura } from '../factura/entities/factura.entity';
import { CuentasEmpresa } from '../cuentas-empresa/entities/cuentas-empresa.entity';
import { Status } from '../../EntityStatus/entity.estatus.enum';
import { StatusFactura } from '../factura/entities/fatura-status.enum';

import { PagoAnticipado } from '../pago-anticipados/entities/pago-anticipado.entity';

@Injectable()
export class PagoFacturaService {
  constructor(
    @Inject('PAGOFACTURA_REPOSITORY')
    private pagoRepository: Repository<PagoFactura>,
    @Inject('FACTURA_REPOSITORY')
    private facturaRepository: Repository<Factura>,
    @Inject('CUENTAEMPRESA_REPOSITORY')
    private cuentaRepository: Repository<CuentasEmpresa>,
    @Inject('PAGOANTICIPADO_REPOSITORY')
    private pagoAnticipadoRepository: Repository<PagoAnticipado>,
  ) {}
  async create(createPagoFacturaDto: CreatePagoFacturaDto): Promise<Factura> {
    const newPagoAnticipado: PagoAnticipado = new PagoAnticipado();
    const pagoFactura: PagoFactura = new PagoFactura();

    const foundFactura: Factura = await this.facturaRepository.findOne({
      relations: {
        cuentaporcobrar: true,
        cliente: true,
      },
      where: {
        cuentaporcobrar: {
          status: Status.ACTIVO,
        },
        id: createPagoFacturaDto.idfactura,
        status: StatusFactura.APROBADA,
      },
    });

    if (!foundFactura) {
      throw new BadRequestException(
        'La Factura introducida está completada o no es válida',
      );
    }

    const foundCuenta: CuentasEmpresa = await this.cuentaRepository.findOne({
      where: { id: createPagoFacturaDto.idcuenta, status: Status.ACTIVO },
    });

    if (!foundCuenta) {
      throw new NotFoundException(
        'La cuenta de la Empresa introducida no es correcta o está desahabilitada',
      );
    }

    if (
      foundFactura.cuentaporcobrar.montorestante >
      parseFloat(createPagoFacturaDto.pago.toString())
    ) {
      foundFactura.cuentaporcobrar.montorestante =
        parseFloat(foundFactura.cuentaporcobrar.montorestante.toString()) -
        parseFloat(createPagoFacturaDto.pago.toString());
      foundFactura.cuentaporcobrar.updatedAt = new Date();
      pagoFactura.pago = createPagoFacturaDto.pago;
    } else {
      const dif =
        parseFloat(createPagoFacturaDto.pago.toString()) -
        parseFloat(foundFactura.cuentaporcobrar.montorestante.toString());

      foundFactura.status = StatusFactura.COMPLETADA;
      pagoFactura.pago = foundFactura.cuentaporcobrar.montorestante;
      foundFactura.cuentaporcobrar.montorestante = 0;
      foundFactura.cuentaporcobrar.status = Status.INACTIVO;
      foundFactura.cuentaporcobrar.updatedAt = new Date();
      newPagoAnticipado.pago = dif;
      newPagoAnticipado.cliente = foundFactura.cliente;
      pagoFactura.pagoanticipado = newPagoAnticipado;
    }

    pagoFactura.cuenta = foundCuenta;
    pagoFactura.factura = foundFactura;
    pagoFactura.numerocheque = createPagoFacturaDto.numerocheque;

    const savedFactura: Factura =
      await this.facturaRepository.save(foundFactura);
    if (!savedFactura) {
      throw new BadRequestException('Error al generar el pago');
    }
    const savedPago: PagoFactura = await this.pagoRepository.save(pagoFactura);

    return await this.facturaRepository.findOne({
      relations: {
        cuentaporcobrar: true,
        cliente: true,
        pagos: true,
      },
      where: {
        id: createPagoFacturaDto.idfactura,
        status: Not(StatusFactura.CANCELADA),
      },
    });
  }

  async pagos(idfactura: string): Promise<Factura> {
    return await this.facturaRepository
      .createQueryBuilder('factura')
      .innerJoinAndSelect('factura.cliente', 'cliente')
      
      .leftJoinAndSelect('cliente.pagosanticipados', 'pagoanticipado','pagoanticipado.status = :statuspago',{statuspago: Status.ACTIVO})
      .leftJoinAndSelect('pagoanticipado.cuenta', 'cuenta')
      .innerJoinAndSelect('cliente.credito', 'credito')  
      .innerJoinAndSelect('factura.cuentaporcobrar', 'cuentaporcobrar')
      .leftJoinAndSelect('factura.pagos', 'pago','pago.status = :estadopago', { estadopago: Status.ACTIVO })
      .leftJoinAndSelect('pago.cuenta', 'cuenta')
      .leftJoinAndSelect('cuenta.moneda', 'moneda')

      .where('factura.id = :id', { id: idfactura })
     .andWhere('factura.status != :estadofactura', {
       estadofactura: StatusFactura.CANCELADA,
      })
      .getOne();
    /*
    return   await  this.facturaRepository.findOne({
      relations: {
        cuentaporcobrar: true,
        cliente: true,
        pagos: true,
		
	
        
    },
    where: {
     
        id: idfactura,    
        status: Not( StatusFactura.CANCELADA)
	
    },
    });*/
  }

  findAll() {
    return `This action returns all pagoFactura`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pagoFactura`;
  }

  update(id: number, updatePagoFacturaDto: UpdatePagoFacturaDto) {
    return `This action updates a #${id} pagoFactura`;
  }

  async remove(id: string): Promise<PagoFactura> {
    const foundPago: PagoFactura = await this.pagoRepository.findOne({
      relations: {
        factura: true,
      },
      where: {
        id: id,
        status: Not(Status.INACTIVO),
      },
    });

    if (!foundPago) {
      throw new NotFoundException('No existe el pago Introducido');
    }
    foundPago.factura.status = StatusFactura.APROBADA;
    foundPago.factura.cuentaporcobrar.montorestante =
      parseFloat(foundPago.factura.cuentaporcobrar.montorestante.toString()) +
      parseFloat(foundPago.pago.toString());
    foundPago.factura.cuentaporcobrar.status = Status.ACTIVO;
    const updateFactura: Factura = await this.facturaRepository.save(
      foundPago.factura,
    );
    if (!updateFactura) {
      throw new BadRequestException('Error al cancelar el pago');
    }
    foundPago.status = Status.INACTIVO;

    return await this.pagoRepository.save(foundPago);
  }
}
