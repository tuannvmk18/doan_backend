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

  async create(createProductDto: CreateProductDto) {
    const newProduct = this.productRepository.create(createProductDto);
    await this.productRepository.save(newProduct);
    return newProduct;
  }

  async findAll(skip: number = undefined, take: number = undefined) {
    return await this.productRepository.find({
      skip,
      take,
    });
  }

  async findOne(id: number) {
    return await this.productRepository.findOne(id);
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return await this.productRepository.update(id, updateProductDto);
  }

  async remove(id: number) {
    return await this.productRepository.softDelete(id);
  }
}
