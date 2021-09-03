import { ApiProperty } from '@nestjs/swagger';

export class MailCreateDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  body: string;

  @ApiProperty()
  receiver: string;
}
