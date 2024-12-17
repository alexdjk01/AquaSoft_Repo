import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/user.model.js';
import { Permission } from '../models/permission.model.js';
import { Role } from '../models/role.model.js';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private readonly usersModel: typeof User,
        @InjectModel(Permission)
        private readonly permissionModel: typeof Permission,
        @InjectModel(Role)
        private readonly roleModel: typeof Role,
    ) { }


    //Method that retrieves all users for the database
    async findAll(): Promise<User[]> {
        return this.usersModel.findAll();
    }

    //Method the retrieved a user with the username specified
    async findByUserName(username: string): Promise<User> {
        const user = await this.usersModel.findOne({ where: { Username: username } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    //Method to create a new user instance in the Users database
    async create(userData: Partial<User>): Promise<User> {
        return this.usersModel.create(userData);
    }

    //Method to update the fields of a specific user in the database
    async update(id: number, userData: Partial<User>): Promise<User> {
        const user = await this.usersModel.findByPk(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user.update(userData);
    }

    //Method to delete a user instance from the database
    async remove(id: number): Promise<void> {
        const user = await this.usersModel.findByPk(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        await user.destroy();
    }
}
