import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../functions/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UsersController } from '../functions/users/users.controller';
import { LocalStrategy } from './local.strategy';
import { AhorrosModule } from 'src/functions/ahorros/ahorros.module';
import { CreditosModule } from 'src/functions/creditos/creditos.module';
import { PasswordResetService } from './generate-code.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    CreditosModule,
    AhorrosModule,
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy, PasswordResetService],
  exports: [AuthService],
  controllers: [UsersController],
})
export class AuthModule {}
