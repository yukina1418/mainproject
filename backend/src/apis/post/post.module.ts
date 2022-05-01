import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAccessStrategy } from 'src/commons/auth/jwt-access.strategy';
import { PostTag } from '../postTag/models/entities/postTag.entity';
import { User } from '../User/models/entities/user.entity';
import { Post } from './models/entities/post.entity';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, PostTag, User]),
    ElasticsearchModule.register({
      node: 'http://elasticsearch:9200',
    }),
  ],
  providers: [
    PostService, //
    PostResolver,
    JwtAccessStrategy,
  ],
})
export class PostModule {}
