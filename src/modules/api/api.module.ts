import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommonController, UserController } from "./controllers";
import {
  CommonService,
  UserService,
  VehicleManufacturerService,
  VehicleService,
} from "./services";
import { VehicleManufacturerController } from "./controllers/vehicleManufacturer/vehicleManufacturer.controller";
import { VehicleModelService } from "./services/vehicleModel.service";
import { VehicleModelController } from "./controllers/vehicleModel/vehicleModel.controller";
import { VehicleController } from "./controllers/vehicle/vehicle.controller";
import {
  Common,
  User,
  Vehicle,
  VehicleManufacturer,
  VehicleModel,
} from "../../domain/entities";
import { UserRepository, VehicleRepository } from "../database/repositories";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Vehicle,
      VehicleModel,
      VehicleManufacturer,
      UserRepository,
      VehicleRepository,
      Common,
    ]),
  ],
  controllers: [
    UserController,
    VehicleManufacturerController,
    VehicleModelController,
    VehicleController,
    CommonController,
  ],
  providers: [
    CommonService,
    UserService,
    VehicleManufacturerService,
    VehicleModelService,
    VehicleService,
    UserRepository,
    VehicleRepository,
  ],
  exports: [TypeOrmModule],
})
export class ApiModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer;
  }
}
