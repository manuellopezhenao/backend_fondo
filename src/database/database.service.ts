import { Injectable } from '@nestjs/common';
import { db } from 'src/database/db';

@Injectable()
export class DataBaseService {
  private _db = new db();
  get db(): any {
    return this._db;
  }
}
