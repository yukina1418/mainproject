import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { Post } from '../post/models/entities/post.entity';
import { User } from '../User/models/entities/user.entity';
import { Comment } from './models/entities/comment.entity';

@Injectable()
export class commentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async create({ currentUser, postid, contents }) {
    const userData = await getConnection()
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where({ user_id: currentUser.user_id })
      .getOne();

    return await this.commentRepository.save({
      user: currentUser.user_id,
      post: postid,
      writer: userData.user_nickname,
      contents,
    });
  }

  async update({
    currentUser,
    post_id,
    comment_id,
    contents,
  }): Promise<Comment> {
    const target = await getConnection()
      .createQueryBuilder()
      .select('comment')
      .from(Comment, 'comment')
      .where({ user: currentUser.user_id, post: post_id })
      .getOne();

    return await this.commentRepository.save({
      ...target,
      contents,
    });
  }
}
