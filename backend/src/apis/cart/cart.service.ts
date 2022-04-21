import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { Product } from '../product/models/entities/product.entity';
import { ProductInfo } from '../productinfo/models/entities/productinfo.entity';
import { User } from '../User/models/entities/user.entity';
import { Cart } from './modules/entities/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly CartRepository: Repository<Cart>,
  ) {}

  // async create({ user_id }) {
  //   return await this.CartRepository.save({
  //     user: { user_id },
  //   });
  // }

  async read({ user_id }) {
    const Alldata = await getConnection()
      .createQueryBuilder()
      .select('cart')
      .from(Cart, 'cart')
      .innerJoinAndSelect('cart.user', 'user')
      .innerJoinAndSelect('cart.product', 'product')
      .where({ user: user_id })
      .getMany();

    for (let i = 0; i < Alldata.length; i++) {
      console.log(Alldata[i].product.name);

      const rrr = await getConnection()
        .createQueryBuilder()
        .update(ProductInfo)
        .set({ volume: () => 'volume+5' })
        .where({ name: Alldata[i].product.name })
        .execute();

      console.log(rrr);

      console.log('===========');
    }
    // console.log(qqq);

    // const Alldata = await getConnection()
    //   .createQueryBuilder()
    //   .select('cart')
    //   .from(Cart, 'cart')
    //   .innerJoinAndSelect('cart.user', 'user')
    //   .innerJoinAndSelect('cart.product', 'product')
    //   .where({ user: user_id })
    //   .getOne();

    // console.log(Alldata);
    // const bbb = await this.CartRepository.findOne(
    //   { id: qqq.id },
    //   { relations: ['user', 'product'] },
    // );

    return Alldata;
  }

  // async read({ user_id }) {
  //   return await this.CartRepository.createQueryBuilder()
  //     .where({ user: currentUser.user_id })
  //     .getOne();
  // }

  async update({ user_id, item, volume }) {
    // const user_Cart = await this.CartRepository.createQueryBuilder()
    //   .where({ product: item })
    //   .getOne();

    // console.log(user_Cart);

    const userDate = await getConnection()
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where({ user_id })
      .getOne();

    const productData = await getConnection()
      .createQueryBuilder()
      .select('product')
      .from(Product, 'product')
      .where({ name: item })
      .getOne();

    const user_Cart = await this.CartRepository.createQueryBuilder()
      .where({ product: productData, user: user_id })
      .getOne();

    console.log(user_Cart);

    if (!user_Cart) {
      const makeCart = await this.CartRepository.save({
        sum: productData.price * volume,
        item,
        volume,
        user: userDate,
        product: productData,
      });

      return makeCart;
    } else {
      const plusCart = await this.CartRepository.save({
        ...user_Cart,
        sum: user_Cart.sum + productData.price * volume,
        volume: user_Cart.volume + volume,
      });

      return plusCart;
    }
  }

  async deletedate({ user_id, item, volume }) {
    const productData = await getConnection()
      .createQueryBuilder()
      .select('product')
      .from(Product, 'product')
      .where({ name: item })
      .getOne();

    const user_Cart = await this.CartRepository.createQueryBuilder()
      .where({ product: productData, user: user_id })
      .getOne();

    if (user_Cart.volume < volume)
      throw new ConflictException('수량이 초과하였습니다.');

    const data = await this.CartRepository.save({
      ...user_Cart,
      sum: user_Cart.sum - productData.price * volume,
      volume: user_Cart.volume - volume,
    });

    if (data.volume === 0) {
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Cart)
        .where({ product: productData, user: user_id })
        .execute();
    }
    return data;
  }

  async order({ user_id }) {
    const readata = await getConnection()
      .createQueryBuilder()
      .select('cart')
      .from(Cart, 'cart')
      .innerJoinAndSelect('cart.user', 'user')
      .innerJoinAndSelect('cart.product', 'product')
      .where({ user: user_id })
      .getMany();

    for (let i = 0; i < readata.length; i++) {
      await getConnection()
        .createQueryBuilder()
        .update(ProductInfo)
        .set({ volume: () => `volume-${readata[i].volume}` })
        .where({ name: readata[i].product.name })
        .execute();
    }

    const Alldata = await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Cart)
      .where({ user: user_id })
      .execute();

    // 재고에서 판매된 물품만큼 지우기
  }
}

// @InjectRepository(Item)
// private readonly itemRepository: Repository<Item>,

// @InjectRepository(User)
// private readonly userRepository: Repository<User>,

// 장바구니에 물건을 지우기
// 주문을 할 경우 테이블 삭제

// const user_Cart = await this.CartRepository.createQueryBuilder()
//   .where({ user: user_id })
//   .getOne();

// console.log(user_Cart);
// const PlusCart = await this.itemRepository.findOne({
//   where: { id: items[0] },
// });

// const user_cart = await this.CartRepository.createQueryBuilder()
//   .where({ user: date.user_id })
//   .getOne();

// const aaaa = await this.CartRepository.findOne({
//   where: { id: user_cart.id },
//   relations: ['items', 'user'],
// });

// for (let i = 0; i < aaaa.items.length; i++) {}
// console.log(aaaa.items[0]);
// console.log(aaaa.items[1]);
// if (!user_cart) {
//   // 장바구니가 없을 경우 생성
//   const arr = [];
//   arr.push(PlusCart);
//   console.log('추가');
//   const createCart = await this.CartRepository.save({
//     user: { user_id: date.user_id },
//     name: PlusCart.pick,
//     sum: PlusCart.amount,
//     items: arr,
//   });

//   return createCart;
// } else {
// 장바구니가 있을 경우 수량 증가
// 같은 물품이 들어온다면 금액을 원래 금액 * 2를 하고
// 수량이라는 데이터를 상품쪽에 달아놓고, +1을 해준다
// const Read_User_Data = await this.CartRepository.findOne({
//   where: { id: user_cart.id },
//   relations: ['items', 'user'],
// });

//   Read_User_Data.items.map((ele, idx) =>
//     ele.id.includes(PlusCart.id) ? console.log('aaaa') : console.log('bbb'),
//   );

//   Read_User_Data.items.forEach((ele) => ele.id.includes(PlusCart.id) ? ele.amount += ele.amount);
// console.log(Read_User_Data.items[0].id);

// Read_User_Data.items.push(PlusCart);

// console.log('업데이트');
// const Update_Cart = await this.CartRepository.save({
//   ...Read_User_Data,
//   name: user_cart.name + '외 1개',
//   sum: user_cart.sum + PlusCart.amount,
// });

// console.log(Update_Cart);

// return Update_Cart;
//}

// const aaaa = await this.CartRepository.findOne({
//     where: { id: 'aee79774-e474-433c-bee1-18d5636e0b83' },
//     relations: ['items'],
//   });
//   console.log(aaaa);
// const aaa = await this.CartRepository.createQueryBuilder()
//   .update()
//   .set({ items: 1 + items })
//   .where({ id: 'b95ed5a8-8cfd-4c81-ab69-0c61ef9c6445' })
//   .execute();

// await this.CartRepository.save({

//     items
// })

// const qqqq = await this.CartRepository.update(
//   { id: user_cart.id },
//   { items: arr},
// );
// const newuser = await this.CartRepository.save({
//   ...date,
//   items,
// });

// console.log(newuser);
// console.log(newuser);
// const aaa = await this.CartRepository.findOne({
//   where: { id: newuser.id },
//   relations: ['items', 'user'],
// });
// console.log(aaa);
// const items = await this.CartRepository.update(
//   { id: user_cart.id },
//   { items: items.push(item_id) },
// );
//    console.log(aaa);
// const user = await this.CartRepository.findOne({
//   where: { id: user_cart.id },
//   relations: ['items', 'user'],
// });
// user.items.push(item_id);
//  console.log(user);
// console.log(user);
// return user;
// console.log(user_cart.id);
//    return user_cart;
//console.log(user_cart);

// const aaa = await this.CartRepository.find({
//   relations: ['user', 'items'],
// });

// const qeqe = await this.CartRepository.save({
//   user: { user_id: date.user_id },
//   name: '10',
//   items: items + arr,
// });

// const user = await this.CartRepository.findOne({
//   where: { name: '10' },
//   relations: ['items', 'user'],
// });

// 장바구니

// 장바구니 Id// 총액 // 유저Id(조인) // 물건id(조인) // [물건id,갯수]

// 장바구니 // 총액 // 유저ID // 물건 이름 // 갯수(6)
//  => 결제 // 상품 => 6개 토마토 => Id[]
