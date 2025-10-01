import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { VehicleType } from "../../../../domain/enums";
import { VehicleModelDto } from "../vehicleModel/vehicleModel.dto";

export class VehicleDto {
  @AutoMap()
  @ApiProperty({ required: true })
  public readonly id!: string;

  @AutoMap()
  @ApiProperty({ required: true })
  public readonly name!: string;

  @AutoMap(() => VehicleModelDto)
  @ApiProperty({ required: true })
  public readonly model!: VehicleModelDto;

  @AutoMap()
  @ApiProperty({ required: true })
  public readonly vehicleType!: VehicleType;

  @AutoMap()
  @ApiProperty({ required: true })
  public readonly createdAt!: Date;

  @AutoMap()
  @ApiProperty({ required: true })
  public readonly updatedAt!: Date;

  @AutoMap()
  @ApiProperty({ required: false })
  public readonly deletedAt?: Date;
}
