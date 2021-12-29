import {
  AfterInsert,
  AfterLoad,
  AfterUpdate,
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderLine } from './order_line.entity';

export enum OrderStatus {
  DRAFT = 'draft',
  DOING = 'doing',
  PAID = 'paid',
  CANCELLED = 'cancelled',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('float')
  tax: number;

  @Column('float', { nullable: true })
  total: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.DRAFT,
  })
  status: OrderStatus;

  @Column({ type: 'integer' })
  table_id: number;

  @CreateDateColumn()
  create_date: Date;

  @UpdateDateColumn()
  write_date: Date;

  @OneToMany(() => OrderLine, (order_line) => order_line.order, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  order_line!: OrderLine[];
}
