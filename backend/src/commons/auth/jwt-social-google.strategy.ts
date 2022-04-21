//jwt-social-google.strategy.ts
import * as dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';

dotenv.config();

const CLIENTID = process.env.GOOGLE_CLIENTID;
const CLIENTSECRET = process.env.GOOGLE_CLIENTSECRET;
@Injectable()
export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: CLIENTID,
      clientSecret: CLIENTSECRET,
      callbackURL: 'http://localhost:3000/login/google',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string, //
    refreshToken: string,
    profile: Profile,
  ) {
    return {
      user_email: profile.emails[0].value,
      user_nickname: profile.name.familyName + profile.name.givenName,
      social_site: profile.provider,
    };
  }
}
