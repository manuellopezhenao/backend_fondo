import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    if (!username || !password) {
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'Usuario o contraseña incorrectos',
        access_token: null,
      });
    }

    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'Usuario o contraseña incorrectos',
      });
    }
    return true;
  }
}
