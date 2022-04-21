import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { User } from 'src/apis/User/models/entities/user.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum POINT_TRANSACTION_STATUS_ENUM {
  PAYMENT = 'PAYMENT',
  CANCELLED = 'CANCELLED',
}
// cancelled

// 그래프큐엘에서 ENUM타입 쓰는 법
registerEnumType(POINT_TRANSACTION_STATUS_ENUM, {
  name: 'POINT_TRANSACTION_STATUS_ENUM',
});

export abstract class Content {}

@ObjectType()
@Entity()
export class PointTransaction {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  impUid: string;

  @Column()
  @Field(() => Int)
  amount: number;

  @Column()
  @Field(() => Int)
  checksum: number;

  @Column({ type: 'enum', enum: POINT_TRANSACTION_STATUS_ENUM }) // 이렇게 쓰면 둘 중 한개로만 나옴
  @Field(() => POINT_TRANSACTION_STATUS_ENUM)
  status: string;

  @ManyToOne(() => User)
  user: User;

  @CreateDateColumn()
  @Field(() => Date)
  createAt: Date;
}
