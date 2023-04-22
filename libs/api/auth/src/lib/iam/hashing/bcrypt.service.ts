import { genSalt, hash, compare } from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { HashingService } from '../hashing/hashing.service';

@Injectable()
export class BcryptService implements HashingService {
  async hash(password: string | Buffer): Promise<string> {
    const salt = await genSalt(10);
    return hash(password, salt);
  }

  async compare(password: string | Buffer, hash: string): Promise<boolean> {
    return compare(password, hash);
  }
}
