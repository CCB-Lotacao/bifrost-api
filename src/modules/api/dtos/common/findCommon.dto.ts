import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class FindCommonDto {
  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  public readonly name?: string;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  public readonly state?: string;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  public readonly city?: string;
}
