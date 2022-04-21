import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/apis/User/models/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super({
      //
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'myAccessKey',
    });
  }

  async validate(payload) {
    const user = await this.userRepository
      .createQueryBuilder()
      .where({ user_email: payload.user_email })
      .getOne();

    return {
      user_email: payload.user_email,
      user_id: user.user_id,
    };
  }
}

// 쿼리가 실행이 되기 전에 검증
// guard 라는 나만의 전략을 검증이 되야만 쿼리문이 실행된다
// 토큰방식으로 인증을 하게 된다
// 컨스트럭터가 1번, 검증부
// 검증이 완료가 되면 2번, validate가 실행된다
// payload는 복호화된 정보를 받아온다
