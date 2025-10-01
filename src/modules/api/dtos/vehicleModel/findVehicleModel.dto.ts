import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class FindVehicleModelDto {
  @ApiProperty({ required: false })
  @IsString()
  public readonly name?: string;
}
