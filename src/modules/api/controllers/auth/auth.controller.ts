import {
  Controller,
  Post,
  Body,
  Req,
  UnauthorizedException,
} from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import { UserService } from "../../services";
import { LoginUserDto } from "../../dtos";

@Controller("auth")
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post("login")
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.authenticate(
      loginUserDto.email,
      loginUserDto.password
    );
  }

  @Post("refresh")
  refresh(@Req() req: any) {
    // Use 'any' for req typing or import Express' Request for correct typing.
    const authHeader =
      req.headers["authorization"] || req.headers["Authorization"];
    if (!authHeader) throw new UnauthorizedException("No token provided");

    const refreshToken = (
      typeof authHeader === "string" ? authHeader : authHeader[0]
    ).replace("Bearer ", "");

    try {
      if (!process.env.JWT_SECRET) {
        throw new UnauthorizedException("JWT secret not configured");
      }
      const payload = jwt.verify(
        refreshToken,
        process.env.JWT_SECRET as string
      ) as jwt.JwtPayload & { sub?: any };

      const newAccessToken = jwt.sign(
        {
          sub: payload.sub,
        },
        process.env.JWT_SECRET,
        { expiresIn: 900 }
      );

      return { acessToken: newAccessToken };
    } catch {
      throw new UnauthorizedException("Invalid refresh token");
    }
  }
}
