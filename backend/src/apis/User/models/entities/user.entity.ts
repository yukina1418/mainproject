import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User_Rank } from 'src/apis/UserRank/models/entities/user_rank.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  user_id: string;

  @Column({ default: 0 }) // 0이면 일반유저, 1이면 점주
  @Field(() => Boolean)
  state: boolean;

  @Column({ unique: true })
  @Field(() => String)
  user_email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  @Field(() => String)
  user_nickname: string;

  @ManyToOne(() => User_Rank)
  user_Rank: User_Rank;

  @Column({ nullable: true })
  @Field(() => String)
  user_name: string;

  @Column({ nullable: true })
  @Field(() => String)
  user_phone: string;

  @Column({ default: 0 })
  @Field(() => Int)
  point: number;

  @Column({ default: '우리 사이트' })
  @Field(() => String)
  social_site: string;

  @CreateDateColumn()
  @Field(() => Date)
  member_since: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  member_data_update: Date;

  @DeleteDateColumn()
  deleteAt: Date;
}
