import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString, IsUUID } from "class-validator";
import { VehicleType } from "../../../../domain/enums";

export class CreateVehicleDto {
  @AutoMap()
  @ApiProperty({ required: true })
  @IsString()
  public readonly name!: string;

  @AutoMap()
  @ApiProperty({ required: true })
  @IsUUID()
  public readonly modelId!: string;

  @AutoMap()
  @ApiProperty({ required: true })
  @IsEnum(VehicleType)
  public readonly type!: VehicleType;
}
