import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateVehicleManufacturerDto {
  @AutoMap()
  @ApiProperty({ required: true })
  @IsString()
  public readonly name!: string;
}
