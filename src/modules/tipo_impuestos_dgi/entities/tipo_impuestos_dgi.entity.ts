import {ImpuestosDgi} from '../../impuestos_dgi/entities/impuestos_dgi.entity';
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
  @Entity('tipos_impuestos_dgi') 
export class TipoImpuestosDgi {

    @PrimaryGeneratedColumn('uuid')
id: string;
@Column({ type: 'varchar', unique: true, nullable: false })
name: string;
@OneToMany(() => ImpuestosDgi, (impuestodgi) => impuestodgi.tipo)
impuestodgi: ImpuestosDgi[];
@CreateDateColumn({ type: 'timestamp', name: 'created_at' })
createdAt: Date;
@CreateDateColumn({ type: 'timestamp', name: 'updated_at' })
updatedAt: Date;

}
