import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  async addToFavorites(userId: number, productId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    const product = await this.prisma.product.findUnique({ where: { id: productId } });

    if (!user || !product) {
      throw new NotFoundException('Пользователь или продукт не найдены.');
    }

    return this.prisma.favorite.create({
      data: {
        userId,
        productId,
      },
    });
  }

  async removeFromFavorites(userId: number, productId: number) {
    const favorite = await this.prisma.favorite.findUnique({
      where: {
        userId_productId: { userId, productId },
      },
    });

    if (!favorite) {
      throw new NotFoundException('Продукт не найден в избранном.');
    }

    return this.prisma.favorite.delete({
      where: {
        userId_productId: { userId, productId },
      },
    });
  }

  async getFavorites(userId: number) {
    return this.prisma.favorite.findMany({
      where: { userId },
      include: {
        product: true, 
      },
    });
  }
}
