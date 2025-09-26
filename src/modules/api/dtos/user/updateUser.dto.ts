import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class UpdateUserDto {
  @AutoMap()
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  public readonly id!: string;

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
}
