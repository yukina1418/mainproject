import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateImageInput } from './createImage.input';

@InputType()
export class UpdateImageInput extends PartialType(CreateImageInput) {}
