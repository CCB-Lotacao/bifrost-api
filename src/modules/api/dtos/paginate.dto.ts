import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsPositive } from "class-validator";

export class PaginateDto {
  @ApiProperty({ required: false, nullable: true, default: 10 })
  @IsOptional()
  @IsInt()
  @IsPositive()
  public readonly limit?: number;

  @ApiProperty({ required: false, nullable: true, default: 0 })
  @IsOptional()
  @IsInt()
  public readonly offset?: number;
}
