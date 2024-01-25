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
import { Proyecto } from '../../proyecto/entities/proyecto.entity';
import { StatusGasto } from '../entities/gasto-status.enum';
import { PagoGasto } from '../../pago-gasto/entities/pago-gasto.entity';
import { CuentasPorPagarEmpresa } from './cuenta-por-pagar-empresa.entity';
import { GastoItem } from '../../gasto_item/entities/gasto_item.entity';
import { TipoPagoGasto } from './gasto-tipo-pago.enum';
import {Provedor} from '../../provedor/entities/provedor.entity';
@Entity('gastos_empresa')
export class GastosEmpresa {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar', nullable: false })
  descripcion: string;

  @Column({ type: 'varchar', nullable: true })
  NCF: string;
  @Column({ type: 'varchar', nullable: true })
  factura: string;


  @ManyToOne(() => Proyecto, (proyecto) => proyecto.gastos, { nullable: true })
  proyecto: Proyecto;
 

  @OneToOne((type) => CuentasPorPagarEmpresa, {
    cascade: true,
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'cuenta_por_pagar_id' })
  cuentaporpagar: CuentasPorPagarEmpresa;

  @OneToMany(() => PagoGasto, (pagos) => pagos.gastoempresa, {
    nullable: true,
    eager: true,
    cascade: true,
  })
  pagos: PagoGasto[];

  

  @OneToMany(() => GastoItem, (items) => items.gasto, {
    nullable: true,
    eager: true,
    cascade: true,
  })
  gastosItems: GastoItem[];

  @Column({
    type: 'varchar',
    nullable: false,
    default: TipoPagoGasto.TRANSFERENCIA,
  })
  tipoPago: string;
 
  @Column({ type: 'decimal', nullable: false,default: 0, precision: 10, scale: 2 })
  propina: number;
  @Column({ type: 'decimal', nullable: false,default: 0, precision: 10, scale: 2 })
  impuestoselectivoconsumo: number;		
  @ManyToOne(() => Provedor, (provedor) => provedor.gastos, { nullable: false })
  provedor: Provedor;
  @Column({ type: 'varchar', nullable: true })
  retencion: string;
  @Column({ type: 'decimal', nullable: false,default: 0, precision: 10, scale: 2 })
  valorretencion: number;
  @Column({ type: 'varchar', nullable: false, default: StatusGasto.ACTIVO })
  status: string;
  @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
  createdAt: Date;
  @CreateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
  updatedAt: Date;
}
