import { Field, ObjectType } from '@nestjs/graphql';
import { Post } from 'src/apis/post/models/entities/post.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class PostTag {
  @PrimaryGeneratedColumn('increment')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  names: string;

  @ManyToMany(() => Post, (posts) => posts.postTags)
  @Field(() => [Post])
  posts: Post[];
}
