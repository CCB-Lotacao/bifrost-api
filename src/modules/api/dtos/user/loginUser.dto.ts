import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ required: true, example: "example@example.com" })
  public readonly email!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true, example: "password123" })
  public readonly password!: string;
}
