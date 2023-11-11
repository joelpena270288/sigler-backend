
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
import { Contacto } from '../../contacto/entities/contacto.entity';
import { Proyecto } from '../../proyecto/entities/proyecto.entity';
import { Status } from '../../../EntityStatus/entity.estatus.enum';
import{Factura} from '../../factura/entities/factura.entity';
@Entity('clientes')
export class Cliente {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'varchar', length: 250, nullable: false })
    nombre: string;
    @Column({ type: 'varchar', length: 250, nullable: true })
    direccion: string;
    @Column({ type: 'varchar',length: 16, nullable: true })
    telefono: string;
    @Column({ type: 'varchar' ,length: 25, nullable: true })
    rcn: string; 
    @Column({ type: 'varchar', length: 25, nullable: true,default: Status.ACTIVO })
    status: string; 
    @OneToMany((type) => Contacto, (contacto) => contacto.cliente, { eager: true })
   
    contactos: Contacto[];

    @OneToMany(() => Proyecto, (proyecto) => proyecto.cliente)
    proyectos: Proyecto[];
    @OneToMany(() => Factura, (factura) => factura.cliente)
    facturas: Factura[];

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;
    @CreateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
  
}

