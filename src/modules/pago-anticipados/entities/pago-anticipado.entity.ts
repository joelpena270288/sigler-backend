
import { Cliente } from '../../cliente/entities/cliente.entity';
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
  @Entity('pagos_anticipados') 
export class PagoAnticipado {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Cliente, (cliente) => cliente.pagosanticipados, {
     
        nullable: false,
          })
      cliente: Cliente;
      @Column({ type: 'decimal', nullable: true, precision: 10, scale: 2 })
      pago: number;
      @Column({ type: 'varchar', nullable: true})
      numeroCheque: string;
      @Column({ type: 'varchar', nullable: true})
      numeroTransferencia: string;
      @CreateDateColumn({ type: 'timestamp', name: 'created_at', nullable: true })
      createdAt: Date; 
      @CreateDateColumn({ type: 'timestamp', name: 'updated_at', nullable: true })
      updatedAt: Date;
  


}
