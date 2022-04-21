import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartResolver } from './cart.resolver';
import { CartService } from './cart.service';
import { Cart } from './modules/entities/cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart])],
  providers: [CartService, CartResolver],
})
export class CartModule {}
