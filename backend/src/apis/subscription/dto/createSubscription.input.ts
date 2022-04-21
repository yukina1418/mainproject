import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateSubscriptionInput {
  @Field(() => String)
  id: string;

  @Field(() => Int)
  payment_price: number;

  @Field(() => String)
  payment_type: string;

  @Field(() => Boolean)
  subsc_flag: boolean;
}
