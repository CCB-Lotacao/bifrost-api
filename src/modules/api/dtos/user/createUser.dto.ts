import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

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
}
