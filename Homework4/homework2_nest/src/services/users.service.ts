import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/user.model.js';
import { Permission } from '../models/permission.model.js';
import { Role } from '../models/role.model.js';
import { HotelOffers } from '../models/hoteloffers.model.js';

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
        // Check if the email already exists
        const existingUser = await this.usersModel.findOne({ where: { Email: userData.Email } });
        if (existingUser) {
            throw new ConflictException('Email already taken');
        }

        // Find the default role (assuming "traveler" is the default role)
        const defaultRole = await this.roleModel.findOne({ where: { RoleName: 'Traveler' } });

        if (!defaultRole) {
            throw new NotFoundException('Default role not found');
        }
        console.log(defaultRole);
        // Set the role ID to the default role
        userData.RoleID = parseInt( defaultRole.getDataValue('RoleID'));

        // Create the new user instance
        const newUser = await this.usersModel.create({
            ...userData,
            RoleID: userData.RoleID,  
        });

        return newUser;
    }
    // Method to handle user login with email and password
    async login(email: string, password: string): Promise<string> {
        const user = await this.usersModel.findOne({ where: { Email: email } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const passwordUser = user.getDataValue('Password');
        // Compare the provided password with the stored password (no hashing in this case)
        if (passwordUser !== password) {
            throw new NotFoundException('Invalid credentials');
        }

        return 'Login successful'; // Return a success message
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
