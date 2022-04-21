import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    //

    private readonly jwtService: JwtService,
  ) {}

  setRefreshToken({ user, res }) {
    const refreshToken = this.jwtService.sign(
      { user_email: user.user_email },
      { secret: 'myRefreshKey', expiresIn: '2w' },
    );
    // 개발 환경
    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}`);
  }
  async getAccessToken({ user }) {
    // JWT는 누구나 열어볼 수 있기 때문에 최대한 적은 데이터로 사용하는게 좋다
    return this.jwtService.sign(
      { user_email: user.user_email },
      { secret: 'myAccessKey', expiresIn: '1h' },
    );
  }

  social_login({ user, res }) {
    this.setRefreshToken({ user, res });
    res.redirect(
      'http://localhost:5500/main-project/frontend/login/index.html',
    );
  }
}

// expiresIn 이건 토큰의 만료기간을 이야기한다
// 1분 1m
// 1시간 1h
// 1일 1d
// 1주일 1w

// 배포 환경
// res.setHeader('Access-Control-Allow-Origin', 'https://myfrontsite.com') // 허용해주는 사이트
// res.setHeader(
//   'Set-Cookie',
//   `refreshToken=${refreshToken}; path=/; domain=.mybacksite.com;
// SameSite=None; Secure; httpOnly;`
// )
