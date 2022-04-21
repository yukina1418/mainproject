import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateSubscriptionInput } from './dto/createSubscription.input';
import { UpdateSubscriptionrInput } from './dto/updateSubscription.input';

import { Subscription } from './models/entities/subscription.entity';
import { SubscriptionService } from './subscription.service';

@Resolver()
export class SubscriptionResolver {
  constructor(private readonly subscriptionService: SubscriptionService) {} // 이렇게 쓰면 서비스 ts에 있는 클래스를 가져다가 쓸 수 있음

  @Query(() => Subscription)
  fetchSubscription(
    //
    @Args('SubscId') SubscId: string,
  ) {
    return this.subscriptionService.findOne({ SubscId });
  }

  @Query(() => [Subscription])
  fetchSubscriptions() {
    return this.subscriptionService.findAll();
  }

  @Mutation(() => Subscription)
  createSubscription(
    @Args('createSubscriptionInput')
    createSubscriptionInput: CreateSubscriptionInput, // args == 주는쪽
  ) {
    return this.subscriptionService.create({ createSubscriptionInput });
  }

  @Mutation(() => Subscription)
  async updateSubscription(
    @Args('SubscId') SubscId: string,
    @Args('updateSubscriptionrInput')
    updateSubscriptionrInput: UpdateSubscriptionrInput,
  ) {
    return await this.subscriptionService.update({
      SubscId,
      updateSubscriptionrInput,
    });
  }
}
