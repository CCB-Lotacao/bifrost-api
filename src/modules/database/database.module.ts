import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import {
  Common,
  User,
  Vehicle,
  VehicleManufacturer,
  VehicleModel,
} from "../../domain/entities";
import { DatabaseConfiguration } from "./database.config";
import { UserRepository, VehicleRepository } from "./repositories";

@Module({
  providers: [UserRepository, VehicleRepository],
  exports: [UserRepository, VehicleRepository],
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfiguration,
    }),
    TypeOrmModule.forFeature([
      Vehicle,
      User,
      VehicleManufacturer,
      VehicleModel,
      Common,
    ]),
  ],
})
export class DatabaseModule {}
