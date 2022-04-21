import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateProductInfoInput } from './dto/createProductInfo.input';
import { UpdateProductInfoInput } from './dto/updateProductInfo.input';
import { ProductInfo } from './models/entities/productinfo.entity';
import { ProductInfoService } from './productinfo.service';

@Resolver()
export class ProductInfoResolver {
  constructor(private readonly productInfoService: ProductInfoService) {}

  @Mutation(() => ProductInfo)
  createInfo(
    @Args('createProductInfoInput')
    createProductInfoInput: CreateProductInfoInput,
  ) {
    return this.productInfoService.create({ createProductInfoInput });
  }

  @Mutation(() => ProductInfo)
  updateInfo(
    @Args('name') name: string,
    @Args('updateProductInput') updateProductInput: UpdateProductInfoInput,
  ) {
    return this.productInfoService.update({ name, updateProductInput });
  }
}
