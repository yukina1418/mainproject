import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemResolver } from './item.resolver';
import { ItemService } from './item.service';
import { Item } from './models/entities/item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item])],
  providers: [ItemResolver, ItemService],
})
export class ItemModule {}
