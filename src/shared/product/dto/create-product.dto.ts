import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CategoryDto {
  id: number;
  name: string;
  path: string;
}

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
