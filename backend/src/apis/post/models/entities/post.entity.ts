import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PostTag } from 'src/apis/postTag/models/entities/postTag.entity';
import { User } from 'src/apis/User/models/entities/user.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Post {
  @PrimaryGeneratedColumn('increment')
  @Field(() => String)
  post_id: string;

  @Column()
  @Field(() => String)
  contents: string;

  @Column()
  @Field(() => String)
  title: string;

  @Column({ default: 0 })
  @Field(() => Int)
  like_count: number;

  @Column({ default: 0 })
  @Field(() => Int)
  hit: number;

  @CreateDateColumn()
  @Field(() => Date)
  create_date: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  update_date: Date;

  // @ManyToOne(() => Store)
  // @Field(() => Store)
  // store: Store;

  // @ManyToOne(() => Board)
  // @Field(() => Board)
  // boards: Board;

  @ManyToOne(() => User)
  user: User;

  @JoinTable()
  @ManyToMany(() => PostTag, (postTags) => postTags.posts)
  @Field(() => [PostTag])
  postTags: PostTag[];
}
