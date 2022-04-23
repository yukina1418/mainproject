import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user-param';
import { CreatePostInput } from './dto/createPost.input';
import { UpdatePostInput } from './dto/updatePost.input';
import { Post } from './models/entities/post.entity';
import { PostService } from './post.service';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER, Inject } from '@nestjs/common';

@Resolver()
export class PostResolver {
  constructor(
    //
    private readonly postService: PostService,
    private readonly elasticsearchService: ElasticsearchService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {} // 이렇게 쓰면 서비스 ts에 있는 클래스를 가져다가 쓸 수 있음

  // Create Api Create Api Create Api Create Api Create Api Create Api Create Api Create Api Create Api //
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Post)
  createPost(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('createPostInput') createPostInput: CreatePostInput, // args == 주는쪽
  ) {
    return this.postService.create({
      currentUser,
      createPostInput,
    });
  }
  //
  // Read Api Read Api Read Api Read Api Read Api Read Api Read Api Read Api Read Api Read Api Read Api  //
  // 만들어야 하는 것
  // 1. 접속하지 않은 유저에게 모든 페이지를 보여줄 때
  // 2. 접속하지 않은 유저가 제목으로 검색할때
  // 3. 접속하지 않은 유저가 내용으로 검색할때
  // 4. 접속하지 않은 유저가 제목&내용 겹치는 내용으로 검색할 때
  // 5. 접속하지 않은 유저가 닉네임으로 검색할 때
  // 6. 접속하지 않은 유저가 태그로 검색할 때
  // 7. 접속한 유저가 자신이 쓴 글을 볼 때
  // 8. 접속한 유저가 자신이 쓴 글의 갯수를 확인해야할때
  @Query(() => GraphQLJSONObject)
  async fetchPostTitle(
    //
    @Args('title') title: string,
  ) {
    const RedisData = await this.cacheManager.get(title);

    console.log(RedisData);
    if (!RedisData) {
      return RedisData;
    } else {
      const ELData = await this.elasticsearchService.search({
        index: 'post', // 테이블 위치
        // _source: 'title', 원하는필드 지정해서 볼 수 있음
        // size: 1, // 갯수만큼 보여줌
        // sort: 'post_id', // 특정 테이블 기준으로 정렬 가능 역정렬은 어떻게하지?
        query: {
          //   // match_all: {},
          match: {
            title,
          },
          //   // multi_match: {
          //   //   query: Postid,
          //   //   fields: ['title', 'content'],
          //   // },
        },
      });

      await this.cacheManager.set(title, ELData.hits, { ttl: 90 });

      return ELData.hits;
    }

    // console.log(JSON.stringify(post.hits.hits, null, ' '));
    // return this.postService.findOne({ Postid });
  }
  //
  //
  @Query(() => GraphQLJSONObject)
  async fetchPostContents(
    //
    @Args('contents') contents: string,
  ) {
    return;
  }
  //
  //
  @Query(() => GraphQLJSONObject)
  async fetchPostWriter(
    //
    @Args('writer') writer: string,
  ) {
    return;
  }
  //
  //
  @Query(() => GraphQLJSONObject)
  async fetchPostOfHighHit() {
    const ELData = await this.elasticsearchService.search({
      index: 'post',
      size: 10,
      query: {
        bool: {
          filter: { range: { createat: { gte: '2022-02-08' } } }, // 특정 날짜 이후부터 검색 가능 lte도 쓰면 gte부터 lte까지도 가능
        },
      },
    });

    await this.cacheManager.set('조회수 젤 높은거', ELData.hits, { ttl: 90 });

    return ELData;
  }
  //
  //
  @Query(() => GraphQLJSONObject)
  async fetchPostOfTheBest() {
    const ELData = await this.elasticsearchService.search({
      index: 'post', // 테이블 위치
      // _source: 'title', 원하는필드 지정해서 볼 수 있음
      size: 10, // 갯수만큼 보여줌
      sort: 'like_count', // 특정 테이블 기준으로 정렬 가능 역정렬은 어떻게하지?
      query: {
        match_all: {},
      },
    });
    return;
  }
  //
  //
  //
  @Query(() => [Post])
  fetchPosts() {
    return this.postService.findAll();
  }
  //
  //
  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [Post])
  fetchloginPosts(
    //
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return this.postService.logfind({ currentUser });
  }
  //
  //
  // Update Api Update Api  Update Api  Update Api  Update Api  Update Api  Update Api  Update Api  Update Api  //
  // 글을 업데이트하려면 로그인을 한 상태여야하고
  // 들어가있는 글의 번호와 수정하는 글의 정보가 일치해야한다

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Post)
  async updatePost(
    @Args('Postid') Postid: string,
    @CurrentUser() currentUser: ICurrentUser,
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
  ) {
    return this.postService.checkID({
      currentUser,
      Postid,
      updatePostInput,
    });
  }
  // true를 프론트로 반환하면 프론트는 그 값을 확인해서 수정하는 페이지로 넘겨줌

  // @Mutation(() => Post)
  // async updatePost(
  //   @Args('Postid') Postid: string,
  //   @Args('updatePostInput') updatePostInput: UpdatePostInput,
  // ) {
  //   return this.postService.update({ Postid, updatePostInput });
  // }
  // Delete Api Delete Api Delete Api Delete Api Delete Api Delete Api Delete Api Delete Api Delete Api Delete Api //
  @Mutation(() => Boolean)
  deleteUser(
    @Args('Postid') Postid: string, //
  ) {
    return this.postService.delete({ Postid });
  }
  //
  //
  @Mutation(() => Boolean)
  restorePost(
    @Args('Postid') Postid: string, //
  ) {
    return this.postService.restore({ Postid });
  }
  //
  //
}
