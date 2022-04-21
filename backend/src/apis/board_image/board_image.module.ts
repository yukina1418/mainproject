import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardImageResolver } from './board_image.resolver';
import { BoardImageService } from './board_image.service';
import { BoardImage } from './models/entities/board_Image.entity';

//import { File } from './models/entities/file.entity';

@Module({
  //
  imports: [TypeOrmModule.forFeature([BoardImage])],
  providers: [BoardImageResolver, BoardImageService],
})
export class BoardImageModule {}
