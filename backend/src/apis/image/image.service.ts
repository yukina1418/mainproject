import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { Image } from './modules/entities/image.entity';
import { Storage } from '@google-cloud/storage';
import { FileUpload } from 'graphql-upload';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  async create({ createImageInput }) {
    const { dataId, ...urlArray } = createImageInput;
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Image)
      .where({ dataId })
      .execute();
    // <- 와 이렇게 다 날리면 스토리지에 있는거는 못날리겠네? ㅎㅎ 이것도 프로미스올이네? 날 죽여라

    const waitedUrls = await Promise.all(urlArray.url);

    const results = await Promise.all(
      waitedUrls.map((el) => {
        const data: Promise<Image> = new Promise((resolve) => {
          resolve(this.imageRepository.save({ dataId, url: el }));
        });
        return data;
      }),
    );
    const returndata = [];
    results.map((ele) => {
      return returndata.push(ele.url);
    });

    console.log(results);

    return returndata;
  }

  async update({ updateImageInput }) {
    const storage = new Storage({
      keyFilename: 'my-backend02-dfffa80e6a5c.json',
      projectId: 'my-backend02',
    }).bucket('file_storage_ex');

    const { dataId, ...urlArray } = updateImageInput;
    const image = await this.imageRepository.find({ dataId });

    console.log(image);

    const list = image.map((ele) => {
      return ele.url;
    });

    const waitedUrls = await Promise.all(urlArray.url);

    const result = async () => {
      await Promise.all([
        waitedUrls.map((el) => {
          return new Promise((resolve) => {
            if (!list.includes(el)) {
              resolve(this.imageRepository.save({ dataId, url: el }));
            }
          });
        }),
        list.map((el) => {
          return new Promise((resolve) => {
            if (!waitedUrls.includes(el)) {
              //           storage.file(el).delete(); 검사할때 주석 풀면 에러남!
              resolve(this.imageRepository.delete({ dataId, url: el }));
            }
          });
        }),
      ]);
    };
    result();
    console.log(result);

    return result;
  }
}

// const image = await getConnection()
//   .createQueryBuilder()
//   .select('image')
//   .from(Image, 'image')
//   .where({ dataId })
//   .getMany();
// list.forEach((ele) => {
//   if (!waitedUrls.includes(ele))
//     getConnection()
//       .createQueryBuilder()
//       .select('image')
//       .from(Image, 'image')
//       .where({ dataId, url: ele })
//       .getMany();
// });

// const deleteList = list.filter((ele) => {
//   return !waitedUrls.includes(ele);
// });
// await Promise.all(
//   waitedUrls.map((el) => {
//     return new Promise((resolve, reject) => {
//       if (list.includes(el)) {
//       } else {
//         reject(this.imageRepository.save({ dataId, url: el }));
//       }
//     });
//   }),
// );

// // await Promise.all(
// list.map((el) => {
//   return new Promise((resolve, reject) => {
//     if (!waitedUrls.includes(el)) {

//       resolve(
//         getConnection()
//           .createQueryBuilder()
//           .delete()
//           .from(Image)
//           .where({ dataId, url: el })
//           .execute(),
//       );
//     }
//   });
// }),
// );

// const aaaa = list.map((ele) => {
//   return !waitedUrls.includes(ele) ? console.log(ele) : false;
// });

// console.log(aaaa);
// console.log(results);

// console.log(list);
// console.log(waitedUrls);

// const ee = waitedUrls.map((ele) => {
//   return list.includes(ele);
// });
// console.log(ee);

// const qq = waitedUrls.filter((ele) => {
//   return list.includes(ele);
// });
// console.log(qq);
// console.log(deleteList);
// console.log(waitedUrls.map((ele) => list.includes(ele)));
// console.log(list.map((ele) => waitedUrls.includes(ele)));
// console.log(waitedUrls.filter((ele) => !ele.includes(aaa)));
// await getConnection()
// .createQueryBuilder()
// .delete()
// .from(Image)
// .where({ dataId, url: })
// .execute();

// const urls = urlArray.url;

// console.log(urls);

// console.log(image);
