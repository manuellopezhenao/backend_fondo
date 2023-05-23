import { Injectable } from '@nestjs/common';
import * as randomstring from 'randomstring';

@Injectable()
export class PasswordResetService {
  async generatecode() {
    return await randomstring.generate({
      length: 6,
      charset: 'numeric',
    });
  }
}
