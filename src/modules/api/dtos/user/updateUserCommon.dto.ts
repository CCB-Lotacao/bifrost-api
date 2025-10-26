import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class UpdateUserCommonDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  public readonly commonId!: string;
}
