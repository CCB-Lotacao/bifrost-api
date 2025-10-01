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

@Controller("vehicle-models")
@ApiTags("Vehicle Model")
@DefaultHeaders()
export class VehicleModelController {
  constructor(private readonly vehicleModelService: VehicleModelService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  public find() {
    return this.vehicleModelService.find();
  }

  @Get(":vehicleModelId")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  public findOne(@Param("vehicleModelId") vehicleModelId: string) {
    return this.vehicleModelService.findOne(vehicleModelId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse()
  @ApiBadGatewayResponse()
  @ApiUnprocessableEntityResponse()
  public create(@Body() createVehicleModelDto: CreateVehicleModelDto) {
    return this.vehicleModelService.create(createVehicleModelDto);
  }

  @Delete(":vehicleModelId")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  @ApiNotFoundResponse()
  public delete(@Param("vehicleModelId") vehicleModelId: string) {
    return this.vehicleModelService.delete(vehicleModelId);
  }
}
