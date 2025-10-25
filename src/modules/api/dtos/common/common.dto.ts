import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";
import { UserDto } from "../user/user.dto";

export class CommonDto {
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
  @IsOptional()
  @ApiProperty({ required: false })
  public readonly state?: string;

  @AutoMap()
  @IsOptional()
  @ApiProperty({ required: false })
  public readonly city?: string;

  @AutoMap(() => UserDto)
  @ApiProperty({ required: true })
  public readonly user!: UserDto;

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
