import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateCartInput {
  @Field(() => String)
  user_id: string;

  @Field(() => [String])
  items: string[];
}
