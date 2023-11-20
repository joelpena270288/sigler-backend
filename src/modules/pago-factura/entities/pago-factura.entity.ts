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
import { PagoAnticipado } from '../../pago-anticipados/entities/pago-anticipado.entity';

  @Entity('pagos_facturas')
export class PagoFactura {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'varchar', nullable: true})    
    numerocheque: string;
    @Column({ type: 'decimal', nullable: false, precision: 10, scale: 2 })
    pago: number;
    @ManyToOne(() => Factura, (factura) => factura.pagos, {   
        nullable: false,
      })
      factura: Factura; 
      @ManyToOne(() => CuentasEmpresa, (cuenta) => cuenta.pagos, {   
        nullable: false,
		 eager: true,
      })
      cuenta: CuentasEmpresa; 
      
      @OneToOne((type) => PagoAnticipado, {
        cascade: true,
        nullable: true,
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
