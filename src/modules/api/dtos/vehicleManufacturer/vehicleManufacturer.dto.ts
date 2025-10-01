import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsUUID, IsString, IsDate } from "class-validator";
import { VehicleModelDto } from "../vehicleModel/vehicleModel.dto";

export class VehicleManufacturerDto {
  @AutoMap()
  @ApiProperty({ required: true })
  @IsUUID()
  public readonly id!: string;

  @AutoMap()
  @ApiProperty({ required: true })
  @IsString()
  public readonly name!: string;

  @AutoMap(() => [VehicleModelDto])
  @ApiProperty({ required: true })
  public readonly models!: VehicleModelDto[];

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
