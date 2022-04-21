import { InputType, PartialType } from '@nestjs/graphql';
import { CreatePostInput } from './createPost.input';

@InputType()
export class UpdatePostInput extends PartialType(CreatePostInput) {}
