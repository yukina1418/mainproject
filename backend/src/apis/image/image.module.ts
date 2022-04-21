import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageResolver } from './image.resolver';
import { ImageService } from './image.service';
import { Image } from './modules/entities/image.entity';

@Module({
  //
  imports: [TypeOrmModule.forFeature([Image])],
  providers: [ImageService, ImageResolver],
})
export class ImageModule {}
