//auth.controller.ts
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { User } from '../User/models/entities/user.entity';
import { UserService } from '../User/user.service';
import { AuthService } from './auth.service';

interface IOAuthUser {
  user: Pick<
    User,
    'user_email' | 'user_phone' | 'user_nickname' | 'social_site'
  >;
}

@Controller('/')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get('/login/google')
  @UseGuards(AuthGuard('google'))
  async loginGoogle(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    // 계정이 이미 생성된 상태인지 확인
    const social_user = await this.userService.socialCreate({ user: req.user });
    // 로그인
    this.authService.social_login({ user: social_user, res });
  }

  @Get('/login/kakao')
  @UseGuards(AuthGuard('kakao'))
  async loginKakao(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    // 계정이 이미 생성된 상태인지 확인
    const social_user = await this.userService.socialCreate({ user: req.user });
    // 로그인
    this.authService.social_login({ user: social_user, res });
  }

  @Get('/login/naver')
  @UseGuards(AuthGuard('naver'))
  async loginNaver(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    // 계정이 이미 생성된 상태인지 확인
    const social_user = await this.userService.socialCreate({ user: req.user });
    console.log(social_user);
    // 로그인
    this.authService.social_login({ user: social_user, res });
  }
}
