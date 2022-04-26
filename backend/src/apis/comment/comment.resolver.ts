import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user-param';
import { commentService } from './comment.service';
import { Comment } from './models/entities/comment.entity';

@Resolver()
export class commentResolver {
  constructor(private readonly commentService: commentService) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Comment)
  createComment(
    @Args('postid') postid: string,
    @Args('contents') contents: string,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return this.commentService.create({ postid, currentUser, contents });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Comment)
  updateComment(
    @Args('post_id') post_id: string,
    @Args('comment_id') comment_id: string,
    @Args('contents') contents: string,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return this.commentService.update({
      currentUser,
      post_id,
      comment_id,
      contents,
    });
  }
}
