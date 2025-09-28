import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";

import { User } from "../../../domain/entities";
import { EntityNotFoundError, Equal, ILike } from "typeorm";
import { CreateUserDto, FindUserDto, UpdateUserDto } from "../dtos";

@Injectable()
export class UserService {
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

    const user = await User.save(
      User.create({
        email: lowerCaseEmail,
        name: createUserDto.name,
        phone: createUserDto.phone,
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
}
