import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class ProductInfo {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  info_id: string;

  @Column({ unique: true })
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => Int)
  price: number;

  @Column('decimal', { precision: 5, scale: 2 })
  @Field(() => Float)
  sale: number;

  @Column()
  @Field(() => Int)
  volume: number;

  @Column({ default: 0 })
  @Field(() => Int)
  count: number;

  @CreateDateColumn()
  @Field(() => Date)
  createAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updateAt: Date;
}
