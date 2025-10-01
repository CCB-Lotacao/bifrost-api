import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { VehicleManufacturer } from "../../../domain/entities";
import { CreateVehicleManufacturerDto } from "../dtos";

@Injectable()
export class VehicleManufacturerService {
  public async findOne(id: string): Promise<VehicleManufacturer> {
    return VehicleManufacturer.findOneByOrFail({ id });
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
        `Drone manufacturer ${createVehicleManufacturerDto.name} already exists`
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
    const manufacturer = await this.findOne(id);
    if (!manufacturer)
      throw new NotFoundException(`Drone manufacturer ${id} not found`);

    await VehicleManufacturer.softRemove([manufacturer]);
    return;
  }
}
