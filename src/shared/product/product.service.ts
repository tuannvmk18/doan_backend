import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Connection, Repository } from 'typeorm';
import { InjectConnection } from '@nestjs/typeorm';
import { Product } from '../../entity/product.entity';

@Injectable()
export class ProductService {
  private readonly productRepository: Repository<Product>;

  constructor(@InjectConnection() connection: Connection) {
    this.productRepository = connection.getRepository(Product);
  }

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
