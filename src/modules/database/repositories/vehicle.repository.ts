import { Injectable } from "@nestjs/common";
import { DataSource, Equal, FindOptionsOrder, ILike, IsNull } from "typeorm";
import { BaseRepository } from "./base.repository";
import { Vehicle } from "../../../domain/entities";
import { FindVehicleDto, PaginateDto, SortDto } from "../../api/dtos";
import { removeUndefinedFields } from "../../../common/utills";

@Injectable()
export class VehicleRepository extends BaseRepository<Vehicle, FindVehicleDto> {
  constructor(dataSource: DataSource) {
    super(Vehicle, dataSource);
  }

  public findAllAndCount(
    findVehicleDto: FindVehicleDto,
    paging?: PaginateDto,
    orderBy?: SortDto<Vehicle>
  ): Promise<[Vehicle[], number]> {
    return this.paginate({
      where: {
        deletedAt: IsNull(),
        ...(findVehicleDto.name && {
          name: ILike(`%${findVehicleDto.name}%`),
        }),
        ...(findVehicleDto.modelId && {
          model: { id: Equal(findVehicleDto.modelId) },
        }),
      },
      order: this.makeSort(orderBy),
      withDeleted: true,
      relations: {
        model: { manufacturer: true },
      },
      take: paging?.limit,
      skip: paging?.offset,
    });
  }

  public makeSort(orderBy?: SortDto<Vehicle>): FindOptionsOrder<Vehicle> {
    if (!orderBy) {
      return {
        name: "asc",
        createdAt: "asc",
      };
    }

    return removeUndefinedFields(orderBy);
  }
}
