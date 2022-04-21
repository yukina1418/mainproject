import { InputType, PartialType } from '@nestjs/graphql';
import { CreateProductInfoInput } from './createProductInfo.input';

@InputType()
export class UpdateProductInfoInput extends PartialType(
  CreateProductInfoInput,
) {}
