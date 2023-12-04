import { Equipo } from   '../../equipos/entities/equipo.entity';
import { Proyecto } from '../../proyecto/entities/proyecto.entity';
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
  @Entity('consumo_combustible')
export class ConsumoCombustible {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({type: 'decimal', nullable: false, default: 0, precision: 10, scale: 2 } )
    galones: number;
    @Column({ type: 'varchar', nullable: false })
    combustible: string;
    @Column({ type: 'varchar', nullable: true })
    Nombre: string;
    @Column({ type: 'varchar', nullable: true })
    NCF: string;
    @Column({ type: 'varchar', nullable: true })
    factura: string;
    @Column({ type: 'varchar', nullable: true })
    RNC: string;
    @Column({ type: 'varchar', nullable: true })
    direccion: string; 
    @Column({ type: 'decimal', nullable: false,default: 0, precision: 10, scale: 2 })
    importeimpuesto: number;
    @Column({ type: 'decimal', nullable: false,  precision: 10, scale: 2 })
    importe: number;
    @Column({ type: 'decimal', nullable: false, precision: 10, scale: 2 })
    valortotal: number;
    @ManyToOne(() => Proyecto, (proyecto) => proyecto.consumo_combustibles,{nullable: true})
  @JoinColumn()
  proyecto: Proyecto; 
  @ManyToOne(() => Equipo, (equipo) => equipo.consumo_combustibles,{nullable: false})
  @JoinColumn()
  equipo: Equipo; 
  @Column({ type: 'varchar', length: 10,default: 'ACTIVO', nullable: false })
  status: string;
    @CreateDateColumn({ type: 'timestamp', name: 'fecha', nullable: true })
    fecha: Date; 
    @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
    createdAt: Date; 
    @CreateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
    updatedAt: Date;

}
