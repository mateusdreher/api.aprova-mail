import { ApiProperty } from '@nestjs/swagger';

export class FilterEmailBodyDto {
  @ApiProperty({
    description:
      '1: "Contains", 2: "Exactly the same",3: "Start with",4: "End with"',
    example: 1,
  })
  type: number;

  @ApiProperty()
  value: string;
}
