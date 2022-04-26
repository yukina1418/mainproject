import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { Post } from '../post/models/entities/post.entity';
import { User } from '../User/models/entities/user.entity';
import { postLike } from './models/entities/postLike.entity';

@Injectable()
export class PostLikeService {
  constructor(
    @InjectRepository(postLike)
    private readonly postLikeRepository: Repository<postLike>,
  ) {}

  async create({ currentUser, post_id }) {
    const target = await getConnection()
      .createQueryBuilder()
      .select('postLike')
      .from(postLike, 'postLike')
      .where({ user: currentUser.user_id, post: post_id })
      .getOne();

    if (target) throw new ConflictException('추천은 1회만 가능합니다.');

    await this.postLikeRepository.save({
      user: currentUser.user_id,
      post: post_id,
    });

    await getConnection()
      .createQueryBuilder()
      .update(Post)
      .set({ like_count: () => `like_count+1` })
      .where({ post_id })
      .execute();

    return;
  }
}
