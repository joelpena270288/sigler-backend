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
  import {Status} from '../../../EntityStatus/entity.estatus.enum';
  @Entity('monedas')
export class Moneda {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'varchar', nullable: false, unique: true })    
valor: string;
@Column({ type: 'decimal', nullable: true, precision: 10, scale: 2 })
tasa: number;

@CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
  @CreateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
  @Column({ type: 'varchar', default: Status.ACTIVO, length: 10 })
  status: string;
}
