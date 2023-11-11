
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
  @Entity('gastos_proyecto') 
export class GastosProyecto {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Proyecto, (proyecto) => proyecto.gastos)
    proyecto: Proyecto;


}
