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
  ApiBadGatewayResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from "@nestjs/swagger";
import { DefaultHeaders } from "../../decorators/defaultHeaders.decorator";
import { VehicleModelService } from "../../services";
import { CreateVehicleModelDto } from "../../dtos";
import { Permission } from "../../../../domain/enums";
import { Auth } from "../../decorators";

@Controller("vehicle-models")
@ApiTags("Vehicle Model")
@DefaultHeaders()
export class VehicleModelController {
  constructor(private readonly vehicleModelService: VehicleModelService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  @Auth(Permission.ReadVehicle)
  public find() {
    return this.vehicleModelService.find();
  }

  @Get(":vehicleModelId")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  @Auth(Permission.ReadVehicle)
  public findOne(@Param("vehicleModelId") vehicleModelId: string) {
    return this.vehicleModelService.findOne(vehicleModelId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse()
  @ApiBadGatewayResponse()
  @ApiUnprocessableEntityResponse()
  @Auth(Permission.WriteVehicle)
  public create(@Body() createVehicleModelDto: CreateVehicleModelDto) {
    return this.vehicleModelService.create(createVehicleModelDto);
  }

  @Delete(":vehicleModelId")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  @ApiNotFoundResponse()
  @Auth(Permission.WriteVehicle)
  public delete(@Param("vehicleModelId") vehicleModelId: string) {
    return this.vehicleModelService.delete(vehicleModelId);
  }
}
