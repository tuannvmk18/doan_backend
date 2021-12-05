import { Category } from '../entity/category.entity';
import { Product } from '../entity/product.entity';
import { Order } from '../entity/order.entity';
import { OrderLine } from '../entity/order_line.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Category, Product, Order, OrderLine],
  synchronize: true,
  autoLoadEntities: true,
};
