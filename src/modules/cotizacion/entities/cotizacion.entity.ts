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

import { Status } from '../../../EntityStatus/entity.estatus.enum';
@Entity('cotizaciones')
export class Cotizacion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', nullable: false, default: 0, precision: 10, scale: 2 })
  cantidad: number;
  @Column({ type: 'varchar', nullable: false })
  UM: string;
   @Column({ type: 'varchar', nullable: false })
    nombreServicio: string;

    @Column({ type: 'decimal', nullable: false, precision: 10, scale: 2 })
    precio: number;
    @Column({ type: 'decimal', nullable: false,default: 0, precision: 10, scale: 2 })
    valorimpuesto: number;
    @Column({ type: 'decimal', nullable: false,default: 0, precision: 10, scale: 2 })
    importeimpuesto: number;
    @Column({ type: 'decimal', nullable: false,  precision: 10, scale: 2 })
    importe: number;
    @Column({ type: 'decimal', nullable: false, precision: 10, scale: 2 })
    valortotal: number;
    @Column({ type: 'decimal', nullable: false,  precision: 10, scale: 2 })
   subtotal: number;

  @ManyToOne(() => Proyecto, (proyecto) => proyecto.cotizacion)
  @JoinColumn()
  proyecto: Proyecto; 

  @Column({ type: 'varchar', nullable: false, default: Status.ACTIVO })
  status: string;
  @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
  createdAt: Date;
  @CreateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
  updatedAt: Date;
}
