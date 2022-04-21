import { Field } from '@nestjs/graphql';

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Store {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  owner_id: string;

  @Column()
  @Field(() => String)
  store_name: string;

  @Column()
  @Field(() => String)
  address: string;

  @Column()
  @Field(() => String)
  latiyude: string;

  @Column()
  @Field(() => String)
  longitude: string;

  @Column()
  @Field(() => String)
  category: string;

  @Column()
  @Field(() => Date)
  create_date: Date;
}
