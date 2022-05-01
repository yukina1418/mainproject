import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { commentResolver } from './comment.resolver';
import { commentService } from './comment.service';
import { Comment } from './models/entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  providers: [commentResolver, commentService],
})
export class CommentModule {}
