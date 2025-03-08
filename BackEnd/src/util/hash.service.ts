import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class HashService {
  async hashData(data: string ): Promise<string> {
    return await argon2.hash(data);
  }

  async verifyData(hash: string, data: string): Promise<boolean> {
    return await argon2.verify(hash, data);
  }
}
