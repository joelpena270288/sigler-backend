import { Moneda } from '../../moneda/entities/moneda.entity';
import { Empresa } from '../../empresa/entities/empresa.entity';
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
import { Status } from '../../../EntityStatus/entity.estatus.enum';
import { PagoFactura } from '../../pago-factura/entities/pago-factura.entity';

  @Entity('cuentas_empresa')
export class CuentasEmpresa {
    @PrimaryGeneratedColumn('uuid')
  id: string;
    @ManyToOne(() => Empresa, (empresa) => empresa.cuentas, {   
        nullable: false,
      })
      empresa: Empresa;

      @ManyToOne(() => Moneda, (moneda) => moneda.cuentas, {   
        nullable: false,
		eager: true
      })
      moneda: Moneda; 
      @Column({ type: 'varchar', nullable: false })
      banco: string;
      @Column({ type: 'varchar', nullable: false })
      numerocuenta: string;
      @OneToMany(() => PagoFactura, (pagos) => pagos.cuenta, {
        nullable: true
       
      })
      pagos: PagoFactura[];
      @Column({ type: 'varchar', length: 25, nullable: true,default: Status.ACTIVO })
    status: string; 

      @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
      createdAt: Date;
      @CreateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
      updatedAt: Date;
    }



