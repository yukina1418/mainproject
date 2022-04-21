import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { Product } from '../product/models/entities/product.entity';
import { ProductService } from '../product/product.service';
import { ProductInfo } from './models/entities/productinfo.entity';

@Injectable()
export class ProductInfoService {
  constructor(
    @InjectRepository(ProductInfo)
    private readonly productInfoRepository: Repository<ProductInfo>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    private readonly productService: ProductService,
  ) {}

  async create({ createProductInfoInput }) {
    const checkData = await this.productInfoRepository.findOne({
      where: { name: createProductInfoInput.name },
    });

    if (!checkData) {
      const infoData = await this.productInfoRepository.save({
        ...createProductInfoInput,
      });

      await this.productService.create({
        name: infoData.name,
        price: infoData.price - infoData.price * infoData.sale,
        info: infoData,
      });

      return infoData;
    }
  }

  // 아래같은 조인하는 문법도 있는데 이건 공부해봐야할듯
  // 이렇게 쓸 수 있으면 서비스 안만들어도 돼
  //const user = await createQueryBuilder("user")
  // .leftJoinAndSelect("user.photos", "photo") // user의 photos를 갖고 있는 테이블을 photo로 alias
  // .where("user.name = :name", { name: "Timber" })
  // .getOne();

  async update({ name, updateProductInput }) {
    const dataInfo = await this.productInfoRepository.findOne({
      where: { name },
    });

    const updateInfo = await this.productInfoRepository.save({
      ...dataInfo,
      ...updateProductInput,
    });

    console.log(updateInfo);

    await this.productRepository
      .createQueryBuilder()
      .update(Product)
      .set({
        name: updateInfo.name,
        price: updateInfo.price - updateInfo.price * updateInfo.sale,
      })
      .where({ info: dataInfo })
      .execute();

    // const www = await getConnection()
    //   .createQueryBuilder()
    //   .select('product')
    //   .from(Product, 'product')
    //   .where({ info: dataInfo })
    //   .getOne();

    // const qqq = await this.productRepository
    //   .createQueryBuilder()
    //   .where({ info: dataInfo })
    //   .getOne();

    return updateInfo;
  }
}
