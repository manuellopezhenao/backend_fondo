import { Module } from '@nestjs/common';
import { CreditosService } from './creditos.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  providers: [CreditosService],
  imports: [DatabaseModule],
  exports: [CreditosService],
})
export class CreditosModule {}
