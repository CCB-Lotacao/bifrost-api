import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsString, IsUUID } from "class-validator";
import { VehicleManufacturerDto } from "../vehicleManufacturer/vehicleManufacturer.dto";

export class VehicleModelDto {
  @AutoMap()
  @ApiProperty({ required: true })
  @IsUUID()
  public readonly id!: string;

  @AutoMap()
  @ApiProperty({ required: true })
  @IsString()
  public readonly name!: string;

  @AutoMap(() => VehicleManufacturerDto)
  @ApiProperty({ required: true })
  public readonly manufacturer!: VehicleManufacturerDto;

  @AutoMap()
  @ApiProperty({ required: true })
  @IsDate()
  public readonly createdAt!: Date;

  @AutoMap()
  @ApiProperty({ required: false })
  @IsDate()
  public readonly updatedAt?: Date;

  @AutoMap()
  @ApiProperty({ required: false })
  @IsDate()
  public readonly deletedAt?: Date;
}
