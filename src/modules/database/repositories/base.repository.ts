import { Injectable } from "@nestjs/common";
import {
  BaseEntity,
  FindManyOptions,
  FindOptionsOrder,
  Repository,
  DataSource,
} from "typeorm";
import { EntityTarget } from "typeorm/common/EntityTarget";
import { PaginateDto, SortDto } from "../../api/dtos";

@Injectable()
export abstract class BaseRepository<
  Entity extends BaseEntity,
  FindEntityDto
> extends Repository<Entity> {
  constructor(target: EntityTarget<Entity>, dataSource: DataSource) {
    super(target, dataSource.createEntityManager());
  }

  public paginate(
    options: FindManyOptions<Entity>
  ): Promise<[Entity[], number]> {
    return this.findAndCount(
      Object.assign(options, {
        take: options.take || 10,
        skip: options.skip || 0,
      })
    );
  }

  public abstract findAllAndCount(
    findEntityDto: FindEntityDto,
    paging?: PaginateDto,
    orderBy?: SortDto<Entity>
  ): Promise<[Entity[], number]>;

  public abstract makeSort(): FindOptionsOrder<Entity>;
}
