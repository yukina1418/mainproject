import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Post } from 'src/apis/post/models/entities/post.entity';
import { User } from 'src/apis/User/models/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class postLike {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  postLike_id: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Post)
  post: Post;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
