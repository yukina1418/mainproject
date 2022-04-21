import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateImageInput } from './dto/createImage.input';
import { UpdateImageInput } from './dto/updateImage.input';
import { ImageService } from './image.service';
import { Image } from './modules/entities/image.entity';

@Resolver()
export class ImageResolver {
  constructor(private readonly imageService: ImageService) {}

  @Mutation(() => [String])
  async createImage(
    //
    @Args('createImageInput') createImageInput: CreateImageInput,
  ) {
    return await this.imageService.create({ createImageInput });
  }

  @Mutation(() => [String])
  async updateImage(
    //
    @Args('updateImageInput') updateImageInput: UpdateImageInput,
  ) {
    return await this.imageService.update({ updateImageInput });
  }
}
