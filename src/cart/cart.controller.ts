import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { CartService } from './cart.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  @ApiOperation({ summary: 'Добавление продукта в корзину' })
  @ApiResponse({ status: 201, description: 'Продукт успешно добавлен в корзину.' })
  @ApiResponse({ status: 400, description: 'Ошибка валидации данных.' })
  @ApiResponse({ status: 404, description: 'Пользователь или продукт не найдены.' })
  @ApiBody({
    description: 'Объект, содержащий ID пользователя, ID продукта и количество товара.',
    examples: {
      example1: {
        summary: 'Пример добавления продукта',
        value: {
          userId: 1,
          productId: 2,
          quantity: 3,
        },
      },
    },
  })
  async addToCart(
    @Body() body: { userId: number; productId: number; quantity: number },
  ) {
    const { userId, productId, quantity } = body;
    return this.cartService.addToCart(userId, productId, quantity);
  }

  @Delete('remove/:userId/:productId')
  @ApiOperation({ summary: 'Удаление продукта из корзины' })
  @ApiResponse({ status: 200, description: 'Продукт успешно удален из корзины.' })
  @ApiResponse({ status: 400, description: 'Ошибка валидации данных.' })
  @ApiResponse({ status: 404, description: 'Продукт не найден в корзине.' })
  @ApiParam({
    name: 'userId',
    description: 'ID пользователя, у которого нужно удалить продукт из корзины.',
    example: 1,
  })
  @ApiParam({
    name: 'productId',
    description: 'ID продукта, который нужно удалить из корзины.',
    example: 2,
  })
  async removeFromCart(
    @Param('userId') userId: number,
    @Param('productId') productId: number,
  ) {
    return this.cartService.removeFromCart(Number(userId), Number(productId));
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Получение содержимого корзины' })
  @ApiResponse({
    status: 200,
    description: 'Возвращает список продуктов в корзине пользователя.',
    examples: {
      example1: {
        summary: 'Пример содержимого корзины',
        value: [
          {
            id: 5,
            userId: 1,
            productId: 2,
            quantity: 3,
            createdAt: '2025-01-20T12:00:00.000Z',
            updatedAt: '2025-01-20T12:00:00.000Z',
            product: {
              id: 2,
              name: 'Product Name',
              description: 'Product Description',
              price: 100.0,
              imageUrl: 'https://example.com/image.jpg',
              createdAt: '2025-01-19T12:00:00.000Z',
              updatedAt: '2025-01-19T12:00:00.000Z',
            },
          },
        ],
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Пользователь не найден или корзина пуста.' })
  @ApiParam({
    name: 'userId',
    description: 'ID пользователя, чью корзину нужно получить.',
    example: 1,
  })
  async getCart(@Param('userId') userId: number) {
    return this.cartService.getCart(Number(userId));
  }
}
