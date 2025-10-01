"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const controllers_1 = require("./controllers");
const services_1 = require("./services");
const vehicleManufacturer_controller_1 = require("./controllers/vehicleManufacturer/vehicleManufacturer.controller");
const vehicleModel_service_1 = require("./services/vehicleModel.service");
const vehicleModel_controller_1 = require("./controllers/vehicleModel/vehicleModel.controller");
const vehicle_controller_1 = require("./controllers/vehicle/vehicle.controller");
const entities_1 = require("../../domain/entities");
const repositories_1 = require("../database/repositories");
let ApiModule = class ApiModule {
    configure(consumer) {
        consumer;
    }
};
exports.ApiModule = ApiModule;
exports.ApiModule = ApiModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                entities_1.User,
                entities_1.Vehicle,
                entities_1.VehicleModel,
                entities_1.VehicleManufacturer,
                repositories_1.UserRepository,
                repositories_1.VehicleRepository,
            ]),
        ],
        controllers: [
            controllers_1.UserController,
            vehicleManufacturer_controller_1.VehicleManufacturerController,
            vehicleModel_controller_1.VehicleModelController,
            vehicle_controller_1.VehicleController,
        ],
        providers: [
            services_1.UserService,
            services_1.VehicleManufacturerService,
            vehicleModel_service_1.VehicleModelService,
            services_1.VehicleService,
            repositories_1.UserRepository,
            repositories_1.VehicleRepository,
        ],
        exports: [typeorm_1.TypeOrmModule],
    })
], ApiModule);
