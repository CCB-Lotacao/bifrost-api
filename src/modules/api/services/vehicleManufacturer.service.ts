import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { VehicleManufacturer } from "../../../domain/entities";
import { CreateVehicleManufacturerDto } from "../dtos";
import { EntityNotFoundError, Equal } from "typeorm";

@Injectable()
export class VehicleManufacturerService {
  public async findOne(id: string): Promise<VehicleManufacturer> {
    try {
      return await VehicleManufacturer.findOneByOrFail({ id: Equal(id) });
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(`Vehicle Manufacturer ${id} not found`);
      }

      throw new InternalServerErrorException(error);
    }
  }

  public async find(): Promise<VehicleManufacturer[]> {
    return VehicleManufacturer.find({ relations: { models: true } });
  }

  public async create(
    createVehicleManufacturerDto: CreateVehicleManufacturerDto
  ): Promise<VehicleManufacturer> {
    const vehicleManufacturer = await VehicleManufacturer.findOne({
      where: { name: createVehicleManufacturerDto.name },
      withDeleted: true,
    });

    if (vehicleManufacturer) {
      if (vehicleManufacturer.deletedAt) {
        await VehicleManufacturer.getRepository().restore(
          vehicleManufacturer.id
        );
        return Object.assign(vehicleManufacturer, { deletedAt: null });
      }
      throw new BadRequestException(
        `Vehicle manufacturer ${createVehicleManufacturerDto.name} already exists`
      );
    }

    return VehicleManufacturer.save(
      VehicleManufacturer.create({
        name: createVehicleManufacturerDto.name,
        models: [],
      })
    );
  }

  public async delete(id: string): Promise<void> {
    const manufacturer = await VehicleManufacturer.findOneBy({ id });
    if (!manufacturer)
      throw new NotFoundException(`Vehicle manufacturer ${id} not found`);

    await VehicleManufacturer.softRemove([manufacturer]);
    return;
  }
}
