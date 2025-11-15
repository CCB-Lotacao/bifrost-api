import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsUUID } from "class-validator";

export class UpdateChurchDto {
  @AutoMap()
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: "Brendon Fall" })
  public readonly name?: string;

  @AutoMap()
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: "19 999999999" })
  public readonly state?: string;

  @AutoMap()
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: "19 999999999" })
  public readonly city?: string;

  @AutoMap()
  @ApiProperty({ required: false })
  @IsUUID()
  @IsOptional()
  public readonly userId?: string;
}
