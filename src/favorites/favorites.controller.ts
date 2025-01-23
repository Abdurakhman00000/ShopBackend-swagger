import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('Favorites')
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post('add')
  @ApiOperation({ summary: 'Добавление продукта в избранное' })
  @ApiResponse({ status: 201, description: 'Продукт успешно добавлен в избранное.' })
  @ApiResponse({ status: 400, description: 'Ошибка валидации данных.' })
  @ApiResponse({ status: 404, description: 'Пользователь или продукт не найдены.' })
  @ApiBody({
    description: 'Объект, содержащий ID пользователя и ID продукта.',
    examples: {
      example1: {
        summary: 'Пример добавления в избранное',
        value: {
          userId: 1,
          productId: 2,
        },
      },
    },
  })
  async addToFavorites(@Body() body: { userId: number; productId: number }) {
    const { userId, productId } = body;
    return this.favoritesService.addToFavorites(userId, productId);
  }

  @Delete('remove/:userId/:productId')
  @ApiOperation({ summary: 'Удаление продукта из избранного' })
  @ApiResponse({ status: 200, description: 'Продукт успешно удален из избранного.' })
  @ApiResponse({ status: 404, description: 'Продукт не найден в избранном.' })
  @ApiParam({
    name: 'userId',
    description: 'ID пользователя, у которого нужно удалить продукт из избранного.',
    example: 1,
  })
  @ApiParam({
    name: 'productId',
    description: 'ID продукта, который нужно удалить из избранного.',
    example: 2,
  })
  async removeFromFavorites(
    @Param('userId') userId: number,
    @Param('productId') productId: number,
  ) {
    return this.favoritesService.removeFromFavorites(Number(userId), Number(productId));
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Получение списка избранных продуктов' })
  @ApiResponse({
    status: 200,
    description: 'Возвращает список избранных продуктов пользователя.',
    examples: {
      example1: {
        summary: 'Пример списка избранных продуктов',
        value: [
          {
            id: 1,
            userId: 1,
            productId: 2,
            createdAt: '2025-01-20T12:00:00.000Z',
            product: {
              id: 2,
              name: 'Product Name',
              description: 'Product Description',
              price: 100.0,
              imageUrl: 'https://example.com/image.jpg',
            },
          },
        ],
      },
    },
  })
  @ApiParam({
    name: 'userId',
    description: 'ID пользователя, чьи избранные продукты нужно получить.',
    example: 1,
  })
  async getFavorites(@Param('userId') userId: number) {
    return this.favoritesService.getFavorites(Number(userId));
  }
}
