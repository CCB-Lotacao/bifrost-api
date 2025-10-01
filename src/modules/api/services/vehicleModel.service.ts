import { Equal } from "typeorm";
import {
  BadRequestException,
  NotFoundException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { VehicleManufacturer, VehicleModel } from "../../../domain/entities";
import { CreateVehicleModelDto } from "../dtos";

export class VehicleModelService {
  public find(): Promise<VehicleModel[]> {
    return VehicleModel.find({
      relations: { manufacturer: true },
    });
  }

  public async findOne(id: string): Promise<VehicleModel> {
    return VehicleModel.findOneByOrFail({ id });
  }

  public async create(
    createVehicleModel: CreateVehicleModelDto
  ): Promise<VehicleModel> {
    const manufacturer = await VehicleManufacturer.findOne({
      relations: { models: true },
      where: { id: Equal(createVehicleModel.manufacturerId) },
    });
    if (!manufacturer) {
      throw new UnprocessableEntityException(
        `Manufacturer ${createVehicleModel.manufacturerId} does not exist`
      );
    }
    const vehicleModel = await VehicleModel.findOne({
      where: {
        manufacturer: { id: Equal(manufacturer.id) },
        name: createVehicleModel.name,
      },
    });
    if (vehicleModel) {
      throw new BadRequestException(
        `Vehicle Model ${createVehicleModel.name} already exist`
      );
    }
    return VehicleModel.save(
      VehicleModel.create({
        name: createVehicleModel.name,
        manufacturer,
      })
    );
  }

  public async delete(id: string): Promise<void> {
    const model = await this.findOne(id);
    if (!model) throw new NotFoundException(`Vehicle model ${id} not found`);

    await VehicleModel.softRemove([model]);
    return;
  }
}
