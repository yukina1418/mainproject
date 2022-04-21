import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CartService } from './cart.service';
import { UpdateCartInput } from './dto/updateCart.input';
import { Cart } from './modules/entities/cart.entity';

@Resolver()
export class CartResolver {
  constructor(private readonly CartService: CartService) {}

  @Query(() => Cart)
  async readCart(
    //
    @Args('user_id') user_id: string,
    //@Args('product_id') product_id: string,
  ) {
    return await this.CartService.read({ user_id });
  }

  @Mutation(() => Cart)
  async updateCart(
    //
    @Args('user_id') user_id: string,
    @Args('item') item: string,
    @Args('volume') volume: number,
  ) {
    return await this.CartService.update({ user_id, item, volume });
  }

  @Mutation(() => Cart)
  async deleteCart(
    @Args('user_id') user_id: string,
    @Args('item') item: string,
    @Args('volume') volume: number,
  ) {
    return await this.CartService.deletedate({ user_id, item, volume });
  }

  @Mutation(() => Cart)
  async order(@Args('user_id') user_id: string) {
    return await this.CartService.order({ user_id });
  }
}
