// 1. 장바구니는 유저 한명당 한개씩만 존재한다.
// 2. 장바구니에 물품 넣기를 실행할 경우 장바구니가 생성되면서 그 물품에 관한 정보가 입력된다
// 3. 추가로 입력을 할 경우 배열의 형태로 저장된다.
// 4. 취소를 할 경우 취소를 한 물품의 정보만 사라진다
// 5. 장바구니에서 참조하고 있는 모든 물품이 사라지면 장바구니 데이터는 삭제된다.
// 6. 결제를 할 경우 그 유저가 가지고 있는 장바구니의 id값을
// merchand id로 사용하여 결제를 한다
// 7. name은 제일 먼저 넣은 물건을 넣고 외 들어온 상품의 갯수를 명시해준다
// 대충 과자 외 n개
// 8. 금액은 장바구니 테이블에 들어와있는 모든 아이템의 가격의 합으로 결제한다

// 1. 장바구니의 테이블에 유저의 ID가 존재해야한다
// 2. 장바구니 테이블에 배열의 형식으로 아이템의 ID가 존재해야한다.

import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Item } from 'src/apis/item/models/entities/item.entity';
import { Product } from 'src/apis/product/models/entities/product.entity';
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
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ nullable: true })
  @Field(() => String)
  name: string;

  @Column({ default: 0 })
  @Field(() => Int)
  sum: number;

  @Column()
  @Field(() => String)
  item: string;

  @Column()
  @Field(() => Int)
  volume: number;

  @CreateDateColumn()
  @Field(() => Date)
  createAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updateAt: Date;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Product)
  product: Product;

  // @JoinColumn()
  // @OneToOne(() => User)
  // @Field(() => User)
  // user: User;
}
