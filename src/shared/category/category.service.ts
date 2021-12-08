import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Category } from '../../entity/category.entity';

@Injectable()
export class CategoryService {
  private categoryRepository: Repository<Category>;
  constructor(@InjectConnection() connection: Connection) {
    this.categoryRepository = connection.getRepository(Category);
  }

  create(createCategoryDto: CreateCategoryDto) {
    return 'This action adds a new category';
  }

  async findAll(skip: number = undefined, take: number = undefined) {
    return await this.categoryRepository.find({
      skip,
      take,
    });
  }

  async findOne(id: number) {
    return await this.categoryRepository.findOne(id);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return await this.categoryRepository.update(id, updateCategoryDto);
  }

  async remove(id: number) {
    return await this.categoryRepository.softDelete(id);
  }
}
