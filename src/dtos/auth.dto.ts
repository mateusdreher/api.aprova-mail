import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty()
  nickname: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  password: string;
}
