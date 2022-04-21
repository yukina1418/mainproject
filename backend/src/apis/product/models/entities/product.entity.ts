import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProductInfo } from 'src/apis/productinfo/models/entities/productinfo.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  product_id: string;

  @Column({ unique: true })
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => Int)
  price: number;

  @Column({ default: 1 })
  @Field(() => Int)
  amount: number;

  @CreateDateColumn()
  @Field(() => Date)
  createAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updateAt: Date;

  @JoinColumn()
  @OneToOne(() => ProductInfo)
  @Field(() => ProductInfo)
  info: ProductInfo;
}
