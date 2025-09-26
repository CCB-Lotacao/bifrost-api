import { Injectable } from "@nestjs/common";
import { DataSource, Equal, FindOptionsOrder, ILike, IsNull } from "typeorm";
import { BaseRepository } from "./base.repository";
import { FindUserDto, PaginateDto, SortDto } from "../../api/dtos";
import { User } from "../../../domain/entities";
import { removeUndefinedFields } from "../../../common/utills";

@Injectable()
export class UserRepository extends BaseRepository<User, FindUserDto> {
  constructor(dataSource: DataSource) {
    super(User, dataSource);
  }

  public findAllWithDeleted(findUserDto: FindUserDto): Promise<User[]> {
    return User.find({
      where: {
        ...(findUserDto.name && {
          name: Equal(findUserDto.name),
        }),
        ...(findUserDto.email && {
          email: Equal(findUserDto.email),
        }),
        ...(findUserDto.phone && {
          phone: Equal(findUserDto.phone),
        }),
      },
      withDeleted: true,
    });
  }

  public findAllAndCount(
    findUserDto: FindUserDto,
    paging?: PaginateDto,
    orderBy?: SortDto<User>
  ): Promise<[User[], number]> {
    return this.paginate({
      where: {
        deletedAt: IsNull(),
        ...(findUserDto.name && {
          name: Equal(findUserDto.name),
          ...(findUserDto.email && {
            email: Equal(findUserDto.email),
          }),
          ...(findUserDto.phone && {
            phone: Equal(findUserDto.phone),
          }),
        }),
      },
      order: this.makeSort(orderBy),
      withDeleted: true,
      take: paging?.limit,
      skip: paging?.offset,
    });
  }

  public makeSort(orderBy?: SortDto<User>): FindOptionsOrder<User> {
    if (!orderBy) {
      return {
        createdAt: "asc",
      };
    }

    return removeUndefinedFields(orderBy);
  }
}
