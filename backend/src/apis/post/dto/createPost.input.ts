import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field(() => String)
  contents: string;

  @Field(() => String)
  title: string;

  @Field(() => [String])
  postTags: string[];
}
