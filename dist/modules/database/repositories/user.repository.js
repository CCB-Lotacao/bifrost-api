"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const base_repository_1 = require("./base.repository");
const entities_1 = require("../../../domain/entities");
const utills_1 = require("../../../common/utills");
let UserRepository = class UserRepository extends base_repository_1.BaseRepository {
    constructor(dataSource) {
        super(entities_1.User, dataSource);
    }
    findAllWithDeleted(findUserDto) {
        return entities_1.User.find({
            where: {
                ...(findUserDto.name && {
                    name: (0, typeorm_1.Equal)(findUserDto.name),
                }),
                ...(findUserDto.email && {
                    email: (0, typeorm_1.Equal)(findUserDto.email),
                }),
                ...(findUserDto.phone && {
                    phone: (0, typeorm_1.Equal)(findUserDto.phone),
                }),
            },
            withDeleted: true,
        });
    }
    findAllAndCount(findUserDto, paging, orderBy) {
        return this.paginate({
            where: {
                deletedAt: (0, typeorm_1.IsNull)(),
                ...(findUserDto.name && {
                    name: (0, typeorm_1.Equal)(findUserDto.name),
                    ...(findUserDto.email && {
                        email: (0, typeorm_1.Equal)(findUserDto.email),
                    }),
                    ...(findUserDto.phone && {
                        phone: (0, typeorm_1.Equal)(findUserDto.phone),
                    }),
                }),
            },
            order: this.makeSort(orderBy),
            withDeleted: true,
            take: paging?.limit,
            skip: paging?.offset,
        });
    }
    makeSort(orderBy) {
        if (!orderBy) {
            return {
                createdAt: "asc",
            };
        }
        return (0, utills_1.removeUndefinedFields)(orderBy);
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], UserRepository);
