"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const entities_1 = require("../../../domain/entities");
const typeorm_1 = require("typeorm");
let UserService = class UserService {
    async find() {
        return await entities_1.User.find();
    }
    async findOne(id) {
        try {
            return await entities_1.User.findOneByOrFail({ id: (0, typeorm_1.Equal)(id) });
        }
        catch (error) {
            if (error instanceof typeorm_1.EntityNotFoundError) {
                throw new common_1.NotFoundException(`User ${id} not found`);
            }
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async create(createUserDto) {
        const lowerCaseEmail = createUserDto.email.toLowerCase();
        const existingUser = await entities_1.User.findOne({
            where: { email: (0, typeorm_1.ILike)(lowerCaseEmail) },
        });
        if (existingUser) {
            throw new common_1.BadRequestException(`User with email ${lowerCaseEmail} already exists`);
        }
        const user = await entities_1.User.save(entities_1.User.create({
            email: lowerCaseEmail,
            name: createUserDto.name,
            phone: createUserDto.phone,
        }));
        return user;
    }
    async update(id, updateUserDto) {
        try {
            const user = await entities_1.User.findOneBy({ id });
            if (!user) {
                throw new common_1.NotFoundException(`User ID ${id} not found`);
            }
            Object.assign(user, updateUserDto);
            return await entities_1.User.save(user);
        }
        catch (error) {
            console.error("Error updating user:", error);
            throw new common_1.InternalServerErrorException("An error occurred while updating the user. Please try again later.");
        }
    }
    async delete(id) {
        const user = await this.findOne(id);
        if (!user)
            throw new common_1.NotFoundException(`User ${id} not found`);
        await entities_1.User.softRemove([user]);
        return;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)()
], UserService);
