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
  import {Cliente} from '../../cliente/entities/cliente.entity'
  @Entity('contactos')
export class Contacto {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'varchar', length: 10, nullable: false })
    nombre: string;
    @Column({ type: 'varchar', length: 250, nullable: false })
    apellidos: string;
    @Column({ type: 'varchar', length: 250, nullable: true })
    direccion: string;
    @Column({ type: 'varchar', length: 250, nullable: true })
    teleforno: string;   
    @Column({ type: 'varchar', length: 11, nullable: true })
    di: string;
    @ManyToOne(() => Cliente, (cliente) => cliente.contactos)
    cliente: Cliente
    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;
    @CreateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
  


}
