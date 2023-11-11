
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
    BeforeInsert
  } from 'typeorm';
  import { Proyecto } from '../../proyecto/entities/proyecto.entity';
import { ConduceProcezado } from '../../conduce-procezado/entities/conduce-procezado.entity';
import { StatusFactura } from './fatura-status.enum';
import { TipoFactura } from './factura-tipo.enum';
import { TipoImpuestoFactura } from './factura-impuesto.enum';
import { PreFactura } from '../../pre-factura/entities/pre-factura.entity';

import { ServicioProcesado } from '../../servicio-procesado/entities/servicio-procesado.entity';
import { Cliente } from '../../cliente/entities/cliente.entity';
  @Entity('facturas') 
export class Factura {

    @PrimaryGeneratedColumn('uuid')
    id: string;
   
   
    @OneToMany(() => ServicioProcesado, (servicio_procesado) => servicio_procesado.factura, {
      nullable: true,
      eager: true,
    })
    servicioProcesado: ServicioProcesado[];
  
    @Column({ type: 'varchar', nullable: false, default: StatusFactura.CREADA })
    status: string;
    @Column({ type: 'varchar', nullable: false, default: TipoFactura.PREFACTURA })
    tipo: string;
    @ManyToOne(() => Proyecto, (proyecto) => proyecto.facturas, {
     
      nullable: false,
    })
    proyecto: Proyecto;
    @ManyToOne(() => Cliente, (cliente) => cliente.facturas, {
     
      nullable: false,
    })
    cliente: Cliente;
    @Column({ type: 'varchar', nullable: false })
    nombreproyecto: string;
	 @Column({ type: 'varchar', nullable: false, default: TipoImpuestoFactura.CONSUMO })
    tipoimpuesto: string;
    
   @PrimaryGeneratedColumn()
  consecutivo: number;
    @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
    createdAt: Date; 
    @CreateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
    updatedAt: Date;

}
