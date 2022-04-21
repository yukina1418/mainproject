import {
  UnauthorizedException,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';
import {
  GqlAuthAccessGuard,
  GqlAuthRefreshGuard,
} from 'src/commons/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user-param';
import { UserService } from '../User/user.service';
import { AuthService } from './auth.service';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { JwtAccessStrategy } from 'src/commons/auth/jwt-access.strategy';
import * as jwt from 'jsonwebtoken';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService, // 유저 서비스에 만들어놓은 api 끌어와서 쓰는 방법
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}
  @Mutation(() => String)
  async Userlogin(
    @Args('user_email') user_email: string, //
    @Args('password') password: string,
  ) {
    // 1. 로그인(이메일과 비밀번호가 일치하는 유저 찾기
    const user = await this.userService.findOne({ user_email });
    // 2. 일치하는 유저가 없으면 || 에러 던지기
    if (!user)
      throw new UnprocessableEntityException(
        '아이디 혹은 비밀번호가 다릅니다.',
      );
    // 3. 일치하는 유저가 있지만 || 비밀번호가 틀린다면 에러던지기
    const isAuth = await bcrypt.compare(password, user.password);
    // compare 쓰면 암호화된 비번이랑 내가 넣은 비번이랑 일치하는지 불린값으로 반환해줌
    if (!isAuth)
      throw new UnprocessableEntityException(
        '아이디 혹은 비밀번호가 다릅니다.',
      );

    // 4. 일치하는 유저가 있으면 || 그 유저를 위한 accessToken(=JWT)만들어서 프론트엔드에 넘겨주기
    return this.authService.getAccessToken({ user });
  }
  // 만료된 액세스 토큰 리프레시 토큰으로 재발급하기
  @UseGuards(GqlAuthRefreshGuard)
  @Mutation(() => String)
  async restoreAccessToken(
    //
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return this.authService.getAccessToken({ user: currentUser });
  }

  // @UseGuards(GqlAuthAccessGuard)
  @UseGuards(GqlAuthRefreshGuard) //  <- 아 이거로 검증하려고했는데 토글을 못봤네. . .
  // 날로먹고 실패
  @Mutation(() => String)
  async logout(
    //
    // @CurrentUser() currentUser: any,
    @Context() context: any,
  ) {
    const refresh = context.req.rawHeaders
      .filter((ele) => {
        return ele.match(/refresh/);
      })[0]
      .split('=')[1];

    const access = context.req.rawHeaders
      .filter((ele) => {
        return ele.match(/Bearer/);
      })[0]
      .split(' ')[1];
    console.log(refresh);
    console.log(access);
    try {
      jwt.verify(access, 'myAccessKey');
      jwt.verify(refresh, 'myRefreshKey');
    } catch {
      throw new UnauthorizedException();
    }

    await this.cacheManager.set(access, 'accessToken', { ttl: 10 });
    await this.cacheManager.set(refresh, 'refreshToken', { ttl: 10 });

    return '로그아웃에 성공했습니다';
  }
}
