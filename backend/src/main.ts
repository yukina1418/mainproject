import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { graphqlUploadExpress } from 'graphql-upload';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(graphqlUploadExpress());
  await app.listen(3000);
}
bootstrap();

// @nestjs/typeorm typeorm mysql2 타입orm 다운로드
// 이름만 보면 mysql을 새로 까는 것처럼 보이지만 두개를 연동시켜주는 역할을 한다
