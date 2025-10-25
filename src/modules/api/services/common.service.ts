import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";

import { Common } from "../../../domain/entities";
import { EntityNotFoundError, Equal } from "typeorm";
import { CreateCommonDto, UpdateCommonDto } from "../dtos";

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
      throw new InternalServerErrorException(error);
    }
  }

  public async create(createCommonDto: CreateCommonDto): Promise<Common> {
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
    id: string,
    updateCommonDto: UpdateCommonDto
  ): Promise<Common> {
    try {
      const common = await Common.findOneBy({ id });
      if (!common) {
        throw new NotFoundException(`Common ID ${id} not found`);
      }
      Object.assign(common, updateCommonDto);
      return await Common.save(common);
    } catch (error) {
      console.error("Error updating common:", error);
      throw new InternalServerErrorException(
        "An error occurred while updating the common. Please try again later."
      );
    }
  }

  public async delete(id: string): Promise<void> {
    const common = await this.findOne(id);
    if (!common) throw new NotFoundException(`Commoner ${id} not found`);

    await Common.softRemove([common]);
    return;
  }
}
