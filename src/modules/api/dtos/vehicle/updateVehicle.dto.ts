import { ApiProperty } from "@nestjs/swagger";
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";
import { AutoMap } from "@automapper/classes";
import { VehicleType } from "../../../../domain/enums";
import { CreateVehicleDto } from "./createVehicle.dto";

export class UpdateVehicleDto implements Partial<CreateVehicleDto> {
  @AutoMap()
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  public readonly name?: string;

  @AutoMap()
  @ApiProperty({ required: false })
  @IsUUID()
  @IsOptional()
  public readonly modelId?: string;

  @AutoMap()
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsUUID()
  public readonly vehicleId!: string;

  @AutoMap()
  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsEnum(VehicleType)
  public readonly type?: VehicleType;
}
