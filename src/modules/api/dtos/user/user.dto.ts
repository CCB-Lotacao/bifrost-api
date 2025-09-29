import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";
import { UserRole } from "../../../../domain/enums";

export class UserDto {
  @AutoMap()
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  public readonly id!: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  public readonly name!: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  public readonly email!: string;

  @AutoMap()
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  public readonly phone?: string;

  @AutoMap()
  @IsOptional()
  @ApiProperty({ required: false })
  public readonly state?: string;

  @AutoMap()
  @IsOptional()
  @ApiProperty({ required: false })
  public readonly city?: string;

  @AutoMap()
  @IsEnum(UserRole)
  @IsNotEmpty()
  @ApiProperty({ required: true, default: UserRole.Brotherhood })
  public readonly role!: UserRole;

  @AutoMap()
  @IsDate()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  public readonly createdAt!: Date;

  @AutoMap()
  @IsDate()
  @IsOptional()
  @ApiProperty({ required: false })
  public readonly updatedAt?: Date;

  @AutoMap()
  @IsDate()
  @IsOptional()
  @ApiProperty({ required: false })
  public readonly deletedAt?: Date;
}
