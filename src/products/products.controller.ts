import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiProperty, ApiBody } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { Product } from '@prisma/client';  

class CreateProductDto {
  @ApiProperty({ description: 'Название продукта', example: 'iPhone 14' })
  name: string;

  @ApiProperty({ description: 'Описание продукта', example: 'Смартфон от Apple' })
  description: string;

  @ApiProperty({ description: 'Цена продукта', example: 999.99 })
  price: number;

  @ApiProperty({ description: 'URL изображения продукта', example: 'https://example.com/iphone14.jpg' })
  imageUrl: string;
}

class UpdateProductDto {
  @ApiProperty({ description: 'Название продукта', example: 'iPhone 14 Pro', required: false })
  name?: string;

  @ApiProperty({ description: 'Описание продукта', example: 'Смартфон Apple с улучшенными характеристиками', required: false })
  description?: string;

  @ApiProperty({ description: 'Цена продукта', example: 1099.99, required: false })
  price?: number;

  @ApiProperty({ description: 'URL изображения продукта', example: 'https://example.com/iphone14pro.jpg', required: false })
  imageUrl?: string;
}

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Создание нового продукта' })
  @ApiResponse({
    status: 201,
    description: 'Продукт успешно создан',
    schema: {
      example: {
        id: 1,
        name: 'iPhone 14',
        description: 'Смартфон от Apple',
        price: 999.99,
        imageUrl: 'https://example.com/iphone14.jpg',
        createdAt: '2025-01-20T00:00:00.000Z',
        updatedAt: '2025-01-20T00:00:00.000Z',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Ошибка в данных для создания продукта' })
  @ApiBody({ description: 'Данные для создания продукта', type: CreateProductDto })
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получение списка всех продуктов' })
  @ApiResponse({
    status: 200,
    description: 'Список продуктов',
    schema: {
      example: [
        {
          id: 1,
          name: 'iPhone 14',
          description: 'Смартфон от Apple',
          price: 999.99,
          imageUrl: 'https://example.com/iphone14.jpg',
          createdAt: '2025-01-20T00:00:00.000Z',
          updatedAt: '2025-01-20T00:00:00.000Z',
        },
        {
          id: 2,
          name: 'Samsung Galaxy S21',
          description: 'Смартфон от Samsung',
          price: 899.99,
          imageUrl: 'https://example.com/galaxyS21.jpg',
          createdAt: '2025-01-20T00:00:00.000Z',
          updatedAt: '2025-01-20T00:00:00.000Z',
        },
      ],
    },
  })
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получение продукта по ID' })
  @ApiResponse({
    status: 200,
    description: 'Продукт найден',
    schema: {
      example: {
        id: 1,
        name: 'iPhone 14',
        description: 'Смартфон от Apple',
        price: 999.99,
        imageUrl: 'https://example.com/iphone14.jpg',
        createdAt: '2025-01-20T00:00:00.000Z',
        updatedAt: '2025-01-20T00:00:00.000Z',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Продукт не найден' })
  async findOne(@Param('id') id: number): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновление продукта по ID' })
  @ApiResponse({
    status: 200,
    description: 'Продукт обновлен',
    schema: {
      example: {
        id: 1,
        name: 'iPhone 14 Pro',
        description: 'Смартфон Apple с улучшенными характеристиками',
        price: 1099.99,
        imageUrl: 'https://example.com/iphone14pro.jpg',
        createdAt: '2025-01-20T00:00:00.000Z',
        updatedAt: '2025-01-20T00:00:00.000Z',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Ошибка в данных для обновления продукта' })
  @ApiResponse({ status: 404, description: 'Продукт не найден' })
  @ApiBody({ description: 'Данные для обновления продукта', type: UpdateProductDto })
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление продукта по ID' })
  @ApiResponse({ status: 200, description: 'Продукт удален' })
  @ApiResponse({ status: 404, description: 'Продукт не найден' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.productsService.remove(id);
  }
}
