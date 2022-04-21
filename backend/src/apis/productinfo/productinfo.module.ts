import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../product/models/entities/product.entity';
import { ProductService } from '../product/product.service';
import { ProductInfo } from './models/entities/productinfo.entity';
import { ProductInfoResolver } from './productinfo.resolver';
import { ProductInfoService } from './productinfo.service';

@Module({
  //
  imports: [TypeOrmModule.forFeature([ProductInfo, Product])],
  providers: [ProductInfoResolver, ProductInfoService, ProductService],
})
export class ProductInfoModule {}
