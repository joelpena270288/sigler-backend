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
import { Cliente } from '../../cliente/entities/cliente.entity';
import { Empresa } from '../../empresa/entities/empresa.entity';
import { Factura } from '../../factura/entities/factura.entity';
import { Cotizacion } from '../../cotizacion/entities/cotizacion.entity';
import { GastosProyecto } from '../../gastos_proyecto/entities/gastos_proyecto.entity';
import { Conduce } from '../../conduce/entities/conduce.entity';
import { StatusProyecto } from '../status.enum';
import { ConduceProcezado } from '../../conduce-procezado/entities/conduce-procezado.entity';
import { PreFactura } from '../../pre-factura/entities/pre-factura.entity';
@Entity('proyectos')
export class Proyecto {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @ManyToOne(() => Empresa, (empresa) => empresa.proyectos)
  empresa: Empresa;
  @ManyToOne(() => Cliente, (cliente) => cliente.proyectos, { eager: true })
  cliente: Cliente;

  @OneToMany(() => Cotizacion, (cotizacion) => cotizacion.proyecto, {
    nullable: true,
    eager: true,
  })
  cotizacion: Cotizacion[];

  @OneToMany(() => GastosProyecto, (gasto) => gasto.proyecto)
  gastos: GastosProyecto[];

  @OneToMany(() => Conduce, (conduce) => conduce.proyecto)
  conduces: Conduce[];
  @OneToMany(() => ConduceProcezado, (procezados) => procezados.proyecto, {
    nullable: true,
    eager: true,
  })
  conducesprocesados: ConduceProcezado[];

  @OneToMany(() => PreFactura, (prefactura) => prefactura.proyecto,{
    nullable: true,
    eager: true,
  })
  prefacturas: PreFactura[];
  @OneToMany(() => Factura, (factura) => factura.proyecto,{
    nullable: true,
    eager: true,
  })
  facturas: Factura[];
 
  @CreateDateColumn({ type: 'timestamp', name: 'fecha_inicio', nullable: true })
  fecha_inicio: Date;
  @CreateDateColumn({ type: 'timestamp', name: 'fecha_fin', nullable: true })
  fecha_fin: Date;
  @Column({
    type: 'varchar',
    length: 10,
    nullable: false,
    default: StatusProyecto.CREADO,
  })
  status: string;
  @Column({ type: 'boolean',default: false })
  ajuste: boolean;
  @PrimaryGeneratedColumn()
  consecutivo: number;
  @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
  createdAt: Date;
  @CreateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
  updatedAt: Date;
}
