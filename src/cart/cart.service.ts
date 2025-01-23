import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async addToCart(userId: number, productId: number, quantity: number) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Продукт не найден');
    }

    return this.prisma.cart.upsert({
      where: {
        userId_productId: { userId, productId },
      },
      create: {
        userId,
        productId,
        quantity,
      },
      update: {
        quantity: {
          increment: quantity,
        },
      },
    });
  }

  async removeFromCart(userId: number, productId: number) {
    const cartItem = await this.prisma.cart.findUnique({
      where: { userId_productId: { userId, productId } },
    });

    if (!cartItem) {
      throw new NotFoundException('Продукт не найден в корзине');
    }

    return this.prisma.cart.delete({
      where: { userId_productId: { userId, productId } },
    });
  }

  async getCart(userId: number) {
    return this.prisma.cart.findMany({
      where: { userId },
      include: {
        product: true,
      },
    });
  }
}
