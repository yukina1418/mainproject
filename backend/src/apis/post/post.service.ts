import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { PostTag } from '../postTag/models/entities/postTag.entity';
import { User } from '../User/models/entities/user.entity';
import { Post } from './models/entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly PostRepository: Repository<Post>,

    @InjectRepository(PostTag)
    private readonly PostTagRepository: Repository<PostTag>,
  ) {}

  async findOne({ post_id }) {
    const aaa = await this.PostRepository.findOne({
      where: { post_id },
      relations: ['postTags'],
    });
    const qqq = { ...aaa };
    // console.log(qqq);
    // qqq.title = 'www';
    // console.log(qqq);
    // delete qqq.hit;

    // console.log(qqq);
    // const a = [];
    // a.push(qqq);
    // console.log(a);
    return qqq;
  }
  async findAll() {
    return await this.PostRepository.find({ skip: 10, take: 20 });
    // return await this.PostRepository.find({ relations: ['postTags'] }); //{ relations: ['postTags'] });
  }
  //
  async logfind({ currentUser }) {
    return this.PostRepository.createQueryBuilder()
      .where({ user: currentUser.user_id })
      .getMany();
  }
  //
  async create({ currentUser, createPostInput }) {
    const { postTags, ...post } = createPostInput;

    const userData = await getConnection()
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where({ user_id: currentUser.user_id })
      .getOne();

    const TagArr = [];
    for (let i = 0; i < postTags.length; i++) {
      const tagname = postTags[i].replace('#', '');

      const prevTag = await this.PostTagRepository.findOne({
        where: { names: `${tagname}` },
      });

      if (prevTag) {
        TagArr.push(prevTag);
      } else {
        const NewTag = await this.PostTagRepository.save({
          names: `${tagname}`,
        });
        TagArr.push(NewTag);
      }
    }

    const NewPost = await this.PostRepository.save({
      ...post,
      postTags: TagArr,
      writer: userData.user_nickname,
      user: { user_id: userData.user_id },
    });

    return NewPost;
  }

  async checkID({ currentUser, post_id, updatePostInput }) {
    const Post = await this.PostRepository.findOne({
      where: { post_id },
      relations: ['user'],
    });

    if (Post.user.user_id !== currentUser.user_id) {
      throw new ConflictException('해당 글의 작성자가 아닙니다.');
    } else {
      return await this.PostRepository.save({
        ...Post,
        ...updatePostInput,
      });
    }
  }

  async update({ Postid, updatePostInput }) {
    const Post = await this.PostRepository.findOne({
      where: { post_id: Postid },
    });

    const newProduct = {
      ...Post,
      ...updatePostInput,
    };
    return await this.PostRepository.save(newProduct);
  }

  async delete({ post_id }) {
    const result = await this.PostRepository.softDelete({
      post_id,
    }); // 다양한 조건으로 삭제 가능
    return result.affected ? true : false;
  }

  async restore({ Postid }) {
    const result = await this.PostRepository.restore({ post_id: Postid }); // 다양한 조건으로 삭제 가능
    return result.affected ? true : false;
  }
}
