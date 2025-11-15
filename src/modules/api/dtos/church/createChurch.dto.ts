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

export class CreateChurchDto {
  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true, example: "John Due" })
  public readonly name!: string;

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
}
