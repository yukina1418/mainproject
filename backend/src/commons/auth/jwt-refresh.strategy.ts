import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      //
      jwtFromRequest: (req) => req.headers.cookie.replace('refreshToken=', ''),
      secretOrKey: 'myRefreshKey',
    }); // 여기는 토큰 비밀번호
  } // 검증부

  validate(payload) {
    return {
      login_id: payload.login_id,
    };
  }
}
