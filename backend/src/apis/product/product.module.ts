import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductInfo } from '../productinfo/models/entities/productinfo.entity';
import { Product } from './models/entities/product.entity';
import { ProductService } from './product.service';

@Module({
  //
  imports: [TypeOrmModule.forFeature([Product, ProductInfo])],
  providers: [ProductService],
})
export class ProductModule {}
