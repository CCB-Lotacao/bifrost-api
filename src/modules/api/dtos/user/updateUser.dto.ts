import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator";
import { UserRole } from "../../../../domain/enums";

export class UpdateUserDto {
  @AutoMap()
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: "Brendon Fall" })
  public readonly name?: string;

  @AutoMap()
  @IsEmail()
  @IsOptional()
  @ApiProperty({ required: false, example: "brendon@example.com" })
  public readonly email?: string;

  @AutoMap()
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: "19 999999999" })
  public readonly phone?: string;

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
  @IsEnum(UserRole)
  @IsOptional()
  @ApiProperty({ required: false })
  public readonly role?: UserRole;
}
