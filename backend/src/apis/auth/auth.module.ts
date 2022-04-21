import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../User/user.service';
import { User } from '../User/models/entities/user.entity';
import { AuthController } from './auth.controller';
import { JwtRefreshStrategy } from 'src/commons/auth/jwt-refresh.strategy';
import { JwtGoogleStrategy } from 'src/commons/auth/jwt-social-google.strategy';
import { JwtKakaoStrategy } from 'src/commons/auth/jwt-social-kakao.strategy';
import { JwtNaverStrategy } from 'src/commons/auth/jwt-social-naver.strategy';
import { Cart } from '../cart/modules/entities/cart.entity';
import { CartService } from '../cart/cart.service';
import { Item } from '../item/models/entities/item.entity';

@Module({
  imports: [
    //
    JwtModule.register({}),
    TypeOrmModule.forFeature([User, Cart, Item]),
  ],
  controllers: [AuthController],
  providers: [
    //
    JwtNaverStrategy,
    JwtKakaoStrategy,
    JwtGoogleStrategy,
    JwtRefreshStrategy,
    AuthResolver,
    AuthService,
    UserService,
    CartService,
  ],
})
export class AuthModule {}
