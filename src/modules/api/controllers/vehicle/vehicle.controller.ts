import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import {
  ApiBadGatewayResponse,
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
import { CreateVehicleDto, UpdateUserDto, UpdateVehicleDto } from "../../dtos";
import { DefaultHeaders } from "../../decorators/defaultHeaders.decorator";
import { Permission } from "../../../../domain/enums";

@Controller("vehicles")
@ApiTags("Vehicle")
@DefaultHeaders()
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  @ApiQuery({ name: "name", required: false })
  @Auth(Permission.ReadVehicle)
  public find(@Query("name") name?: string) {
    return this.vehicleService.find({
      name,
    });
  }

  @Get(":vehicleId")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  @Auth(Permission.ReadVehicle)
  public findOne(@Param("vehicleId") vehicleId: string) {
    return this.vehicleService.findOne(vehicleId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse()
  @ApiConflictResponse()
  @ApiUnprocessableEntityResponse()
  @Auth(Permission.WriteVehicle)
  public async create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehicleService.create(createVehicleDto);
  }

  @Patch(":vehicleId")
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiCreatedResponse()
  @ApiBadGatewayResponse()
  @ApiUnprocessableEntityResponse()
  @Auth(Permission.WriteVehicle)
  public update(
    @Param("vehicleId") vehicleId: string,
    @Body() updateVehicleDto: UpdateVehicleDto
  ) {
    return this.vehicleService.update(vehicleId, updateVehicleDto);
  }

  @Delete(":vehicleId")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  @ApiNotFoundResponse()
  @Auth(Permission.WriteVehicle)
  public delete(@Param("vehicleId") vehicleId: string) {
    return this.vehicleService.delete(vehicleId);
  }
}
