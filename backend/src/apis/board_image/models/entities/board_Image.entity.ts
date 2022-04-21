import { Field } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class BoardImage {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  image_id: string;

  @Column()
  @Field(() => String)
  bucketName: string;

  @Column()
  @Field(() => String)
  url: string;

  @CreateDateColumn()
  @Field(() => Date)
  createAt: Date;

  // @ManyToOne(() => Post)
  // post: Post;
}
