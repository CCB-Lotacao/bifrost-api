import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from "@nestjs/common";
import {
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from "@nestjs/swagger";
import { Auth } from "../../decorators";
import { VehicleService } from "../../services";
import { CreateVehicleDto } from "../../dtos";
import { DefaultHeaders } from "../../decorators/defaultHeaders.decorator";

@Controller("vehicles")
@ApiTags("Vehicle")
@DefaultHeaders()
@Auth()
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  @ApiQuery({ name: "name", required: false })
  public find(@Query("name") name?: string) {
    return this.vehicleService.find({
      name,
    });
  }

  @Get(":vehicleId")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  public findOne(@Param("vehicleId") vehicleId: string) {
    return this.vehicleService.findOne(vehicleId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse()
  @ApiConflictResponse()
  @ApiUnprocessableEntityResponse()
  public async create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehicleService.create(createVehicleDto);
  }

  @Delete(":vehicleId")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  @ApiNotFoundResponse()
  public delete(@Param("vehicleId") vehicleId: string) {
    return this.vehicleService.delete(vehicleId);
  }
}
