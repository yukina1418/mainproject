import { Field, Int, ObjectType } from '@nestjs/graphql';

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  subsc_id: string;

  @Column()
  @Field(() => Int)
  payment_price: number;

  @Column()
  @Field(() => String)
  payment_type: string;

  @CreateDateColumn()
  @Field(() => Date)
  payment_date: Date;

  @Column({
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    type: 'timestamp',
  })
  @Field(() => Date)
  subsc_start_date: Date;

  // @Column()
  // @Field(() => Date, { defaultValue: null })
  // subsc_start_end: Date;

  @Column()
  @Field(() => Boolean)
  subsc_flag: boolean;
}
