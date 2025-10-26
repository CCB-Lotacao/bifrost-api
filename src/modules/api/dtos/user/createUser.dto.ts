import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from "class-validator";
import { UserRole } from "../../../../domain/enums";

export class CreateUserDto {
  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true, example: "John Due" })
  public readonly name!: string;

  @AutoMap()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ required: true, example: "example@example.com" })
  public readonly email!: string;

  @AutoMap()
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: "19 999999999" })
  public readonly phone?: string;

  @AutoMap()
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  public readonly state?: string;

  @AutoMap()
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  public readonly city?: string;

  @AutoMap()
  @IsEnum(UserRole)
  @IsNotEmpty()
  @ApiProperty({ enum: UserRole, required: true })
  public role!: UserRole;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({ required: true, example: "password123", minLength: 6 })
  public readonly password!: string;
}
