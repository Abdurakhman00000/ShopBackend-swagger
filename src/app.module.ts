import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CartModule } from './cart/cart.module';
import { FavoritesModule } from './favorites/favorites.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ ConfigModule.forRoot({ isGlobal: true }), PrismaModule, AuthModule, UsersModule, ProductsModule, CartModule, FavoritesModule],
  controllers: [],
  providers: []
})
export class AppModule {}