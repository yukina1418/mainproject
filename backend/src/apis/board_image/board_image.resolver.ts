import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { BoardImageService } from './board_image.service';

@Resolver()
export class BoardImageResolver {
  constructor(
    //
    private readonly boardImageService: BoardImageService,
  ) {}

  @Mutation(() => [String])
  uploadFile(
    // 그래프큐엘 업로드 타입 그리고 파일업로드로 바꿔서 사용한다
    @Args({ name: 'files', type: () => [GraphQLUpload] }) files: FileUpload[],
  ) {
    return this.boardImageService.upload({ files });
  }

  @Mutation(() => String)
  deleteFile(
    @Args('bucketName') bucketName: string,
    @Args('fileName') fileName: string,
  ) {
    return this.boardImageService.delete({ bucketName, fileName });
  }
}
