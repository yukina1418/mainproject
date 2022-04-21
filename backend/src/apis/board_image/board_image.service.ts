import { Injectable } from '@nestjs/common';

import { Storage } from '@google-cloud/storage';
import { FileUpload } from 'graphql-upload';
import { BoardImage } from './models/entities/board_Image.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const KEYFILENAME = process.env.KEYFILENAME;
const PROJECTID = process.env.PROJECTID;
const BUCKET = process.env.BUCKET;

interface IFile {
  files: FileUpload[];
}
// 객체로 들어온 파일의 정보를 인터페이스화 시켜서 리졸버단에서 쓰던 자동완성을 서비스단에서도 쓸 수 있게 한다
@Injectable()
export class BoardImageService {
  constructor(
    //
    @InjectRepository(BoardImage)
    private readonly BoardImageRepository: Repository<BoardImage>,
  ) {}
  async upload({ files }: IFile) {
    // console.log(files);
    console.log(files);

    const storage = new Storage({
      keyFilename: KEYFILENAME,
      projectId: PROJECTID, // 프로젝트 아이디
    }).bucket(BUCKET); // 버켓(폴더) 이름
    console.log(files);

    const waitedFiles = await Promise.all(files);

    // console.log(waitedFiles);
    const results = await Promise.all(
      waitedFiles.map((el) => {
        return new Promise((resolve, reject) => {
          el.createReadStream() // <- stream 형태로 만들어줘
            .pipe(storage.file(el.filename).createWriteStream())
            //  스토리지에 업로드해줘
            // .pipe 읽은 파일에 옵션을 줄 때 사용한다
            .on('finish', () => resolve(`file_storage_ex/${el.filename}`)) // <- 성공하면 이거 실행
            .on('error', () => reject()); // <- 실패하면 이거 실행
        });
      }),
    );
    // await this.BoardImageRepository.save({bucketName: ,url})

    // await storage.file().download()

    return results;
  }

  async delete({ bucketName, fileName }) {
    const storage = new Storage({
      keyFilename: KEYFILENAME,
      projectId: PROJECTID,
    }).bucket(bucketName);

    async function deleteFile() {
      await storage.file(fileName).delete();
      console.log(`gs://${bucketName}/${fileName} deleted`);
    }
    deleteFile().catch(console.error);
  }
}
