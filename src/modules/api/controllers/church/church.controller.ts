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

import { Permission } from "../../../../domain/enums";
import { Auth } from "../../decorators";
import { DefaultHeaders } from "../../decorators/defaultHeaders.decorator";
import { ChurchService } from "../../services";
import { CreateChurchDto, UpdateChurchDto } from "../../dtos";

@Controller("churchs")
@ApiTags("Church")
@DefaultHeaders()
export class ChurchController {
  constructor(private readonly churchService: ChurchService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  // @Auth(Permission.ReadChurch)
  public find() {
    return this.churchService.find();
  }

  @Get(":churchId")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @Auth(Permission.ReadChurch)
  public findOne(@Param("churchId") churchId: string) {
    return this.churchService.findOne(churchId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse()
  @ApiBadGatewayResponse()
  @ApiUnprocessableEntityResponse()
  @Auth(Permission.WriteChurch)
  public create(@Body() createChurchDto: CreateChurchDto) {
    return this.churchService.create(createChurchDto);
  }

  @Patch(":churchId")
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiCreatedResponse()
  @ApiBadGatewayResponse()
  @ApiUnprocessableEntityResponse()
  @Auth(Permission.WriteChurch)
  public update(
    @Param("churchId") churchId: string,
    @Body() updateChurchDto: UpdateChurchDto
  ) {
    return this.churchService.update(churchId, updateChurchDto);
  }

  @Delete(":churchId")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  @ApiNotFoundResponse()
  @Auth(Permission.WriteChurch)
  public delete(@Param("churchId") churchId: string) {
    return this.churchService.delete(churchId);
  }
}
