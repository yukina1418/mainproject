import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAccessStrategy } from 'src/commons/auth/jwt-access.strategy';
import { CartService } from '../cart/cart.service';
import { Cart } from '../cart/modules/entities/cart.entity';
import { Item } from '../item/models/entities/item.entity';
import { User } from './models/entities/user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Cart, Item])],
  providers: [
    JwtAccessStrategy,
    UserResolver, //
    UserService,
    CartService,
  ],
})
export class UserModule {}
