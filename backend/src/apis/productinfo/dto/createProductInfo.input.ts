import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateProductInfoInput {
  @Field(() => String)
  name: string;

  @Field(() => Int)
  price: number;

  @Field(() => Float)
  sale: number;

  @Field(() => Int)
  volume: number;
}
