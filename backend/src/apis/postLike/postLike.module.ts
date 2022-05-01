import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postLike } from './models/entities/postLike.entity';
import { postLikeResolver } from './postLike.resolver';
import { PostLikeService } from './postLike.service';

@Module({
  imports: [TypeOrmModule.forFeature([postLike])],
  providers: [PostLikeService, postLikeResolver],
})
export class PostLikeModule {}
