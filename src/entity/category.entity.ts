import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  path: string;

  @CreateDateColumn()
  create_date: Date;

  @UpdateDateColumn()
  write_date: Date;

  @DeleteDateColumn()
  delete_date: Date;

  @OneToMany(() => Product, (product) => product.category_id, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  public product_ids!: Product[];
}
