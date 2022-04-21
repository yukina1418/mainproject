import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './models/entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create({ name, price, info }) {
    return await this.productRepository.save({
      name,
      price,
      info,
    });
  }

  async update({ name, price }) {
    const data = await this.productRepository.findOne({ where: { name } });

    return await this.productRepository.save({
      ...data,
      name,
      price,
    });
  }
}
