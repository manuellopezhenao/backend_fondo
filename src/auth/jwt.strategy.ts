import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
      expiresIn: '300s',
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }

  async getInfoOfToken(payload: any) {
    return { username: payload.username };
  }
}
