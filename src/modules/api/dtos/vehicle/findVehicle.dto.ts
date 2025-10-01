import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString, IsUUID } from "class-validator";
import { VehicleType } from "../../../../domain/enums";

export class FindVehicleDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  public readonly modelId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  public readonly name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(VehicleType)
  public readonly type?: VehicleType;
}
