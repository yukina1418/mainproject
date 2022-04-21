import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CacheModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AuthModule } from './apis/auth/auth.module';
import { BoardImageModule } from './apis/board_image/board_image.module';
import { CartModule } from './apis/cart/cart.module';
import { IamportModule } from './apis/iamport/iamport.module';
import { ImageModule } from './apis/image/image.module';
import { ItemModule } from './apis/item/item.module';
import { pointTransactionModule } from './apis/pointTransaction/pointTransaction.module';
import { PostModule } from './apis/post/post.module';
import { ProductModule } from './apis/product/product.module';
import { ProductInfoModule } from './apis/productinfo/productinfo.module';
import { SubscriptionModule } from './apis/subscription/subscription.module';
import { UserModule } from './apis/User/user.module';
import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';

//하위 apis의 파일 각각에서 만든 api가 해당하는 폴더의 module에 합쳐지고
// 그것을 app.module에서 호출해서 main단에서 사용한다

@Module({
  imports: [
    // SubscriptionModule,
    UserModule,
    PostModule,
    AuthModule,
    pointTransactionModule,
    ItemModule,
    BoardImageModule,
    ImageModule,
    IamportModule,
    ProductModule,
    ProductInfoModule,
    CartModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'my-database',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'mydocker02',
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
      retryAttempts: 30,
      retryDelay: 5000,
    }),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      url: 'redis://my-redis:6379',
      isGlobal: true,
    }),
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}

// 모듈에서 함수를 서로 이어주는 역할을 지정한다
