import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CategoryDto } from '../../../../dist/entity/dto/category.dto';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  @IsOptional()
  image_path: string;

  @IsOptional()
  category_id: CategoryDto;
}
