import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID } from "class-validator";

export class CreateVehicleModelDto {
  @AutoMap()
  @ApiProperty({ required: true })
  @IsString()
  public readonly name!: string;

  @AutoMap()
  @ApiProperty({ required: true })
  @IsUUID()
  public readonly manufacturerId!: string;
}
