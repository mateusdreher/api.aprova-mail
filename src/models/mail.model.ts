import { UserModel } from './user.model';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class MailModel extends Document {
  @ApiProperty()
  public title: string;

  @ApiProperty()
  public body: string;

  @ApiProperty()
  public sender: string;

  @ApiProperty()
  public receiver: string;

  constructor(init: MailModel) {
    super();
    Object.assign(this, init);
  }
}
