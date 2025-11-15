import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";

import { Church } from "../../../domain/entities";
import { EntityNotFoundError, Equal } from "typeorm";
import { CreateChurchDto, UpdateChurchDto } from "../dtos";
import { removeUndefinedFields } from "../../../common/utills";

@Injectable()
export class ChurchService {
  public async find(): Promise<Church[]> {
    return await Church.find();
  }

  public async findOne(id: string): Promise<Church> {
    try {
      return await Church.findOneByOrFail({ id: Equal(id) });
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(`Church ${id} not found`);
      }
      throw new InternalServerErrorException(`Incorrect format`);
    }
  }

  public async create(createChurchDto: CreateChurchDto): Promise<Church> {
    const { name } = createChurchDto;

    const existingChurch = await Church.findOne({ where: { name } });

    if (existingChurch) {
      throw new ConflictException(`A church with the name already exists`);
    }

    const church = await Church.save(
      Church.create({
        name: createChurchDto.name,
        state: createChurchDto.state,
        city: createChurchDto.city,
      })
    );

    return church;
  }

  public async update(
    churchId: string,
    updateChurchDto: UpdateChurchDto
  ): Promise<Church> {
    const { name, ...rest } = updateChurchDto;

    const church = await Church.findOne({ where: { id: churchId } });
    if (!church) {
      throw new NotFoundException(`Church ${churchId} not found`);
    }

    if (name && name !== church.name) {
      const churchWithSameName = await Church.findOne({
        where: { name },
      });

      if (churchWithSameName) {
        throw new ConflictException("A church with the name already exists");
      }
    }

    const updateData = removeUndefinedFields({ name, ...rest });

    Object.assign(church, updateData);
    return Church.save(church);
  }

  public async delete(id: string): Promise<void> {
    const church = await Church.findOneBy({ id });
    if (!church) throw new NotFoundException(`Church ${id} not found`);
    await Church.softRemove([church]);
    return;
  }
}
