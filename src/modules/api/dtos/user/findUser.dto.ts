import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString } from "class-validator";

export class FindUserDto {
  @ApiProperty({ required: false, nullable: true })
  @IsEmail()
  @IsOptional()
  public readonly email?: string;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  public readonly name?: string;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  public readonly phone?: string;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  public readonly state?: string;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  public readonly city?: string;
}
