import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AhorrosService } from './ahorros.service';

@Module({
  controllers: [],
  imports: [DatabaseModule],
  providers: [AhorrosService],
  exports: [AhorrosService],
})
export class AhorrosModule {}
