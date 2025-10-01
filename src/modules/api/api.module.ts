import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./controllers";
import {
  UserService,
  VehicleManufacturerService,
  VehicleService,
} from "./services";
import { VehicleManufacturerController } from "./controllers/vehicleManufacturer/vehicleManufacturer.controller";
import { VehicleModelService } from "./services/vehicleModel.service";
import { VehicleModelController } from "./controllers/vehicleModel/vehicleModel.controller";
import { VehicleController } from "./controllers/vehicle/vehicle.controller";
import { UserRepository, VehicleRepository } from "../database/repositories";

const REPOSITORIES = [UserRepository, VehicleRepository];

@Module({
  imports: [TypeOrmModule.forFeature(REPOSITORIES)],
  controllers: [
    UserController,
    VehicleManufacturerController,
    VehicleModelController,
    VehicleController,
  ],
  providers: [
    UserService,
    VehicleManufacturerService,
    VehicleModelService,
    VehicleService,
    ...REPOSITORIES,
  ],
})
export class ApiModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer;
  }
}
