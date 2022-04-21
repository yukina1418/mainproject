import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ItemService } from './item.service';
import { Item } from './models/entities/item.entity';

@Resolver()
export class ItemResolver {
  constructor(private readonly itemService: ItemService) {}

  @Mutation(() => Item)
  async createItem(
    //
    @Args('amount') amount: number,
    @Args('pick') pick: string,
  ) {
    return await this.itemService.create({ amount, pick });
  }
}
