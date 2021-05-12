import { Md5 } from 'md5-typescript';
import * as crypto from 'crypto';

export class CryptographySecurity {
  async md5(data) {
    const result = await Md5.init(`${data}${process.env.SALT_KEY}`);
    return result;
  }

}
