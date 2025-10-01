import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from "@nestjs/common";
import {
  SortDto,
  PaginateDto,
  FindVehicleDto,
  CreateVehicleDto,
  UpdateVehicleDto,
} from "../dtos";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityNotFoundError, Equal } from "typeorm";
import { VehicleRepository } from "../../database/repositories";
import { Vehicle, VehicleModel } from "../../../domain/entities";
import { removeUndefinedFields } from "../../../common/utills";

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(VehicleRepository)
    private readonly vehicleRepository: VehicleRepository
  ) {}

  public async findOne(id: string, withDeleted = false): Promise<Vehicle> {
    try {
      return await Vehicle.findOneOrFail({
        where: { id: Equal(id) },
        relations: {
          model: { manufacturer: true },
        },
        withDeleted,
      });
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(`Vehicle ${id} not found`);
      }

      throw new InternalServerErrorException(error);
    }
  }

  public async find(
    findVehicleDto: FindVehicleDto,
    paging?: PaginateDto,
    orderBy?: SortDto<Vehicle>
  ): Promise<[Vehicle[], number]> {
    return this.vehicleRepository.findAllAndCount(
      findVehicleDto,
      paging,
      orderBy
    );
  }

  public async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    const model = await VehicleModel.findOne({
      relations: { manufacturer: true },
      where: { id: Equal(createVehicleDto.modelId) },
    });

    if (!model) {
      throw new UnprocessableEntityException(
        `Vehicle model ${createVehicleDto.modelId} not exists`
      );
    }

    const vehicle = await Vehicle.findOne({
      where: {
        model: { id: Equal(model.id) },
        name: createVehicleDto.name,
      },
      withDeleted: true,
    });

    if (vehicle) {
      if (vehicle.deletedAt) {
        await this.vehicleRepository.restore(vehicle.id);
        return Object.assign(vehicle, { deletedAt: null });
      }

      throw new BadRequestException(
        `Vehicle ${createVehicleDto.name} already exists`
      );
    }

    return Vehicle.save(
      Vehicle.create({
        model,
        name: createVehicleDto.name,
        vehicleType: createVehicleDto.vehicleType,
      })
    );
  }

  public async update(updateVehicleDto: UpdateVehicleDto): Promise<Vehicle> {
    const { vehicleId, ...updateVehicleData } = updateVehicleDto;
    const vehicle = await Vehicle.findOne({
      where: { id: vehicleId },
    });

    if (!vehicle) {
      throw new NotFoundException(`Vehicle ${vehicleId} not found`);
    }

    const updateData = removeUndefinedFields(updateVehicleData);

    return Vehicle.save(Vehicle.create(Object.assign(vehicle, updateData)));
  }

  public async delete(id: string): Promise<void> {
    const vehicle = await Vehicle.findOneBy({ id });
    if (!vehicle) throw new NotFoundException(`Vehicle ${id} not found`);

    await Vehicle.softRemove([vehicle]);
  }
}
