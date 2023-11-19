import { Factura } from '../../factura/entities/factura.entity';
import { Status } from '../../../EntityStatus/entity.estatus.enum';
import { CuentasEmpresa } from '../../cuentas-empresa/entities/cuentas-empresa.entity';
import {
    BaseEntity,
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    JoinColumn,
    CreateDateColumn,
    OneToMany,
    ManyToOne,
    BeforeInsert,
  } from 'typeorm';
import { PagoAnticipado } from 'src/modules/pago-anticipados/entities/pago-anticipado.entity';

  @Entity('pagos_facturas')
export class PagoFactura {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'varchar', nullable: false, unique: true })    
    numerocheque: string;
    @Column({ type: 'decimal', nullable: true, precision: 10, scale: 2 })
    pago: number;
    @ManyToOne(() => Factura, (factura) => factura.pagos, {   
        nullable: false,
      })
      factura: Factura; 
      @ManyToOne(() => CuentasEmpresa, (cuenta) => cuenta.pagos, {   
        nullable: false,
      })
      cuenta: CuentasEmpresa; 
      
      @OneToOne((type) => PagoAnticipado, {
        cascade: true,
        nullable: false,
        eager: true,
      })
      @JoinColumn({ name: 'pago_anticipado' })
      pagoanticipado: PagoAnticipado;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
  @CreateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
  @Column({ type: 'varchar', default: Status.ACTIVO, length: 10 })
  status: string;
}
