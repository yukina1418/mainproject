import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user-param';

import { PointTransaction } from './models/entities/pointTransaction.entity';
import { PointTransactionService } from './pointTransaction.service';

@Resolver()
export class PointTransactionResolver {
  constructor(
    private readonly pointTransactionService: PointTransactionService,
  ) {}
  //
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => PointTransaction)
  createPointTransaction(
    //
    @CurrentUser() currentUser: ICurrentUser,
    @Args('impUid') impUid: string,
    @Args('amount') amount: number,
  ) {
    return this.pointTransactionService.create({
      currentUser,
      impUid,
      amount,
    });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => PointTransaction)
  cancelPointTransaction(
    //
    @CurrentUser() currentUser: ICurrentUser,
    @Args('impUid') impUid: string,
    @Args('amount') amount: number,
    @Args('reason') reason: string,
  ) {
    return this.pointTransactionService.cancel({
      currentUser,
      impUid,
      amount,
      reason,
    });
  }
}
