import { Injectable } from '@nestjs/common';
import * as sql from 'mssql';
import { IRecordSet } from 'mssql';
import { DataBaseService } from 'src/database/database.service';

@Injectable()
export class CreditosService {
  constructor(private database: DataBaseService) {}

  async getAhorros(cedula: number): Promise<IRecordSet<any>> {
    const ahorros = await this.database.db.execute('GetCreditos', [
      { name: 'cedula', type: sql.Int, value: cedula },
    ]);
    return ahorros;
  }
}
