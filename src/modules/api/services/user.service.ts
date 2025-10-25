import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

import { User } from "../../../domain/entities";
import { EntityNotFoundError, Equal, ILike } from "typeorm";
import { CreateUserDto, UpdateUserDto } from "../dtos";
import { IdentityProvider } from "../../../domain/enums";

@Injectable()
export class UserService {
  private readonly JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
  private readonly SALT_ROUNDS = 10;
  public async find(): Promise<User[]> {
    return await User.find();
  }

  public async findOne(id: string): Promise<User> {
    try {
      return await User.findOneByOrFail({ id: Equal(id) });
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(`User ${id} not found`);
      }
      throw new InternalServerErrorException(error);
    }
  }

  public async create(createUserDto: CreateUserDto): Promise<User> {
    const lowerCaseEmail = createUserDto.email.toLowerCase();

    const existingUser = await User.findOne({
      where: { email: ILike(lowerCaseEmail) },
    });

    if (existingUser) {
      throw new BadRequestException(
        `User with email ${lowerCaseEmail} already exists`
      );
    }

    if (!createUserDto.password) {
      throw new BadRequestException(`Password field cannot be null`);
    }

    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      this.SALT_ROUNDS
    );

    const user = await User.save(
      User.create({
        email: lowerCaseEmail,
        name: createUserDto.name,
        phone: createUserDto.phone,
        role: createUserDto.role,
        state: createUserDto.state,
        city: createUserDto.city,
        password: hashedPassword,
        identityProvider: IdentityProvider.Local,
        identityId: lowerCaseEmail,
      })
    );

    return user;
  }

  public async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await User.findOneBy({ id });
      if (!user) {
        throw new NotFoundException(`User ID ${id} not found`);
      }
      Object.assign(user, updateUserDto);
      return await User.save(user);
    } catch (error) {
      console.error("Error updating user:", error);
      throw new InternalServerErrorException(
        "An error occurred while updating the user. Please try again later."
      );
    }
  }

  public async delete(id: string): Promise<void> {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException(`User ${id} not found`);

    await User.softRemove([user]);
    return;
  }

  public async authenticate(
    email: string,
    password: string
  ): Promise<{ user: User; token: string }> {
    const user = await User.findOne({
      where: { email: ILike(email.toLowerCase()) },
    });

    if (!user) {
      throw new UnauthorizedException("Email is invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException("Password is invalid credentials");
    }

    const token = jwt.sign(
      {
        sub: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
      this.JWT_SECRET,
      { expiresIn: 900 }
    );

    return { user, token };
  }
}
