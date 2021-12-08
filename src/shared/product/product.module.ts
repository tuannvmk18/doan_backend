import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../../entity/product.entity';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [],
})
export class ProductModule {}
