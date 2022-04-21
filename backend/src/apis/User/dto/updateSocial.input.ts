import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateSocialInput {
  @Field(() => String, { nullable: true })
  user_nickname: string;
}
