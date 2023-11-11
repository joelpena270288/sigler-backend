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
    @Column({type: 'decimal', nullable: false,default: 0})
    cantLitros: number;

    @CreateDateColumn({ type: 'timestamp', name: 'fecha', nullable: true })
    fecha: Date; 
    @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
    createdAt: Date; 
    @CreateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
    updatedAt: Date;

}
