import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export class UserModel extends Document {
  public name: string;
  public nickname: string;
  public city: string;
  public password: string;

  constructor() {
    super();
  }
}
