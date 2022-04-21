import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateImageInput {
  @Field(() => String)
  dataId: string;

  @Field(() => [String])
  url: string[];
}
