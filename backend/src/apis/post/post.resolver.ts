import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user-param';
import { CreatePostInput } from './dto/createPost.input';
import { UpdatePostInput } from './dto/updatePost.input';
import { Post } from './models/entities/post.entity';
import { PostService } from './post.service';

@Resolver()
export class PostResolver {
  constructor(private readonly postService: PostService) {} // 이렇게 쓰면 서비스 ts에 있는 클래스를 가져다가 쓸 수 있음

  // Create Api Create Api Create Api Create Api Create Api Create Api Create Api Create Api Create Api //
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Post)
  createPost(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('createPostInput') createPostInput: CreatePostInput, // args == 주는쪽
  ) {
    return this.postService.create({
      currentUser: currentUser.user_email,
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
  @Query(() => Post)
  fetchPost(
    //
    @Args('Postid') Postid: string,
  ) {
    return this.postService.findOne({ Postid });
  }
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
  async checkPost(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('Postid') Postid: string,
  ) {
    return this.postService.checkID({
      currentUser: currentUser.user_email,
      Postid,
    });
  }
  // true를 프론트로 반환하면 프론트는 그 값을 확인해서 수정하는 페이지로 넘겨줌

  @Mutation(() => Post)
  async updatePost(
    @Args('Postid') Postid: string,
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
  ) {
    return this.postService.update({ Postid, updatePostInput });
  }
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
