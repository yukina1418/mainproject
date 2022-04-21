import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER, Inject } from '@nestjs/common';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {
    super({
      //
      jwtFromRequest: (req) => req.headers.cookie.replace('refreshToken=', ''),
      secretOrKey: 'myRefreshKey',
      passReqToCallback: true,
    }); // 여기는 토큰 비밀번호
  } // 검증부

  async validate(req, payload) {
    const rawHeadersInRefreshToken = req.rawHeaders
      .filter((ele) => {
        return ele.match(/refresh/);
      })[0]
      .split('=')[1];

    const check = await this.cacheManager.get(rawHeadersInRefreshToken);

    if (check) throw new UnauthorizedException();

    return {
      login_id: payload.login_id,
    };
  }
}
