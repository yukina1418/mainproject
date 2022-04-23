import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user-param';
import { postLike } from './models/entities/postLike.entity';
import { PostLikeService } from './postLike.service';

@Resolver()
export class postLikeResolver {
  constructor(private readonly postLikeService: PostLikeService) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => postLike)
  createLike(
    @Args('postid') postid: string,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return this.postLikeService.create({ postid, currentUser });
  }
}
