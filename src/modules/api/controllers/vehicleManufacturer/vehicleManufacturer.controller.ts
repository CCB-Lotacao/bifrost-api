import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from "@nestjs/common";
import {
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from "@nestjs/swagger";

import { Auth } from "../../decorators";
import { DefaultHeaders } from "../../decorators/defaultHeaders.decorator";
import { CreateVehicleManufacturerDto } from "../../dtos";
import { VehicleManufacturerService } from "../../services";
import { Permission } from "../../../../domain/enums";

@Controller("vehicle-manufacturer")
@ApiTags("Vehicle Manufacturer")
@DefaultHeaders()
export class VehicleManufacturerController {
  constructor(
    private readonly vehicleManufacturerService: VehicleManufacturerService
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  @Auth(Permission.ReadVehicle)
  public find() {
    return this.vehicleManufacturerService.find();
  }

  @Get(":vehicleManufacturerId")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  @Auth(Permission.ReadVehicle)
  public findOne(
    @Param("vehicleManufacturerId") vehicleManufacturerId: string
  ) {
    return this.vehicleManufacturerService.findOne(vehicleManufacturerId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse()
  @ApiConflictResponse()
  @ApiUnprocessableEntityResponse()
  @Auth(Permission.WriteVehicle)
  @ApiBody({
    schema: {
      type: "object",
      required: ["name"],
      properties: {
        name: {
          type: "string",
        },
      },
    },
  })
  public async create(
    @Body() createVehicleManufacturerDto: CreateVehicleManufacturerDto
  ) {
    return this.vehicleManufacturerService.create(createVehicleManufacturerDto);
  }

  @Delete(":vehicleManufacturerId")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  @ApiNotFoundResponse()
  @Auth(Permission.WriteVehicle)
  public delete(@Param("vehicleManufacturerId") vehicleManufacturerId: string) {
    return this.vehicleManufacturerService.delete(vehicleManufacturerId);
  }
}
