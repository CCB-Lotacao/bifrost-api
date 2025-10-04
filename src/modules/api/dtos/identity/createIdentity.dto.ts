import { ApiProperty } from "@nestjs/swagger";

export class CreateIdentityDto {
  @ApiProperty({ required: true })
  public readonly email!: string;

  @ApiProperty({ required: true })
  public readonly name!: string;

  @ApiProperty({ required: true })
  public readonly zoneinfo!: string;
}
