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
import { CommonService } from "../../services";
import { CreateCommonDto, UpdateCommonDto } from "../../dtos";

@Controller("commons")
@ApiTags("Common")
@DefaultHeaders()
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  @Auth(Permission.ReadCommon)
  public find() {
    return this.commonService.find();
  }

  @Get(":commonId")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @Auth(Permission.ReadCommon)
  public findOne(@Param("commonId") commonId: string) {
    return this.commonService.findOne(commonId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse()
  @ApiBadGatewayResponse()
  @ApiUnprocessableEntityResponse()
  @Auth(Permission.WriteCommon)
  public create(@Body() createCommonDto: CreateCommonDto) {
    return this.commonService.create(createCommonDto);
  }

  @Patch(":commonId")
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiCreatedResponse()
  @ApiBadGatewayResponse()
  @ApiUnprocessableEntityResponse()
  @Auth(Permission.WriteCommon)
  public update(
    @Param("commonId") commonId: string,
    @Body() updateCommonDto: UpdateCommonDto
  ) {
    return this.commonService.update(commonId, updateCommonDto);
  }

  @Delete(":commonId")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  @ApiNotFoundResponse()
  @Auth(Permission.WriteCommon)
  public delete(@Param("commonId") commonId: string) {
    return this.commonService.delete(commonId);
  }
}
