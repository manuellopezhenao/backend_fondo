import { Module } from '@nestjs/common';
import { UsersModule } from './functions/users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AhorrosService } from './functions/ahorros/ahorros.service';
import { UsersService } from './functions/users/users.service';
import { AhorrosModule } from './functions/ahorros/ahorros.module';
import { CreditosModule } from './functions/creditos/creditos.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    UsersModule,
    AuthModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [UsersService, AhorrosService],
})
export class AppModule {}
