import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../entity/product.entity';
import { Category } from '../entity/category.entity';
import { OrderLine } from '../entity/order_line.entity';
import { Order } from '../entity/order.entity';
import { Table } from '../entity/table.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        url: process.env.DB_URL,
        ssl: {
          rejectUnauthorized: false,
        },
        entities: [Category, Product, Order, OrderLine, Table],
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
