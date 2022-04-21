import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Subscription } from './models/entities/subscription.entity';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
  ) {}

  async findOne({ SubscId }) {
    return await this.subscriptionRepository.findOne({
      where: { subsc_id: SubscId },
    }); // 쿼리문 조건문
  }
  async findAll() {
    return await this.subscriptionRepository.find({});
  }
  async create({ createSubscriptionInput }) {
    const { id, ...data } = createSubscriptionInput;

    return await this.subscriptionRepository.save({
      ...data,
      owner: { owner_id: id },
    });
  }

  async update({ SubscId, updateSubscriptionrInput }) {
    const subscription = await this.subscriptionRepository.findOne({
      where: { subsc_id: SubscId },
    });

    const newSubscription = {
      ...subscription,
      ...updateSubscriptionrInput,
    };
    return await this.subscriptionRepository.save(newSubscription);
  }
}
