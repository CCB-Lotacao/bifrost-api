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
import { UserService } from "../../services";
import { CreateUserDto, UpdateUserDto, LoginUserDto } from "../../dtos";
import { Auth } from "../../decorators";
import { DefaultHeaders } from "../../decorators/defaultHeaders.decorator";

@Controller("users")
@ApiTags("User")
@DefaultHeaders()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  @Auth(Permission.ReadUser)
  public find() {
    return this.userService.find();
  }

  @Get(":userId")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @Auth(Permission.ReadUser)
  public findOne(@Param("userId") userId: string) {
    return this.userService.findOne(userId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse()
  @ApiBadGatewayResponse()
  @ApiUnprocessableEntityResponse()
  @Auth(Permission.WriteUser)
  public create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Patch(":userId")
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiCreatedResponse()
  @ApiBadGatewayResponse()
  @ApiUnprocessableEntityResponse()
  @Auth(Permission.WriteUser)
  public update(
    @Param("userId") userId: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.update(userId, updateUserDto);
  }

  @Delete(":userId")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  @ApiNotFoundResponse()
  @Auth(Permission.WriteUser)
  public delete(@Param("userId") userId: string) {
    return this.userService.delete(userId);
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  @ApiNotFoundResponse()
  public async login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.authenticate(
      loginUserDto.email,
      loginUserDto.password
    );
  }
}
