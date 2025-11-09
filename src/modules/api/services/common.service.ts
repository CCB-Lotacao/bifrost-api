import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";

import { Common } from "../../../domain/entities";
import { EntityNotFoundError, Equal } from "typeorm";
import { CreateCommonDto, UpdateCommonDto } from "../dtos";
import { removeUndefinedFields } from "../../../common/utills";

@Injectable()
export class CommonService {
  public async find(): Promise<Common[]> {
    return await Common.find();
  }

  public async findOne(id: string): Promise<Common> {
    try {
      return await Common.findOneByOrFail({ id: Equal(id) });
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(`Common ${id} not found`);
      }
      throw new InternalServerErrorException(`Incorrect format`);
    }
  }

  public async create(createCommonDto: CreateCommonDto): Promise<Common> {
    const { name } = createCommonDto;

    const existingCommon = await Common.findOne({ where: { name } });

    if (existingCommon) {
      throw new ConflictException(`A church with the name already exists`);
    }

    const common = await Common.save(
      Common.create({
        name: createCommonDto.name,
        state: createCommonDto.state,
        city: createCommonDto.city,
      })
    );

    return common;
  }

  public async update(
    commonId: string,
    updateCommonDto: UpdateCommonDto
  ): Promise<Common> {
    const { name, ...rest } = updateCommonDto;

    const common = await Common.findOne({ where: { id: commonId } });
    if (!common) {
      throw new NotFoundException(`Common ${commonId} not found`);
    }

    if (name && name !== common.name) {
      const commonWithSameName = await Common.findOne({
        where: { name },
      });

      if (commonWithSameName) {
        throw new ConflictException("A church with the name already exists");
      }
    }

    const updateData = removeUndefinedFields({ name, ...rest });

    Object.assign(common, updateData);
    return Common.save(common);
  }

  public async delete(id: string): Promise<void> {
    const common = await Common.findOneBy({ id });
    if (!common) throw new NotFoundException(`Commoner ${id} not found`);
    await Common.softRemove([common]);
    return;
  }
}
