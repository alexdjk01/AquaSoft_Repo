import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/user.model.js';
import { Permission } from '../models/permission.model.js';
import { Role } from '../models/role.model.js';
import { HotelOffers } from '../models/hoteloffers.model.js';
import { JwtService } from '@nestjs/jwt';
import { Hotel_Group } from '../models/hotel_group.model.js';
import { Hotel } from '../models/hotel.model.js';
import { Link } from '../models/link.model.js';

@Injectable()
export class UsersService {
    constructor(
        private readonly jwtService: JwtService,
        @InjectModel(User)
        private readonly usersModel: typeof User,
        @InjectModel(Permission)
        private readonly permissionModel: typeof Permission,
        @InjectModel(Role)
        private readonly roleModel: typeof Role,
        @InjectModel(Hotel_Group) 
        private readonly hotelgroupModel: typeof Hotel_Group,
        @InjectModel(Hotel) 
        private readonly hotelModel: typeof Hotel,
        @InjectModel(Link) 
        private readonly linkModel: typeof Link,
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
    async findByUserId(id: number): Promise<User> {
        const user = await this.usersModel.findByPk(id);  //  find by (UserID)
        if (!user) {
          throw new NotFoundException('User not found');
        }
        return user;
      }
    
    async getHotelManagersByGroup(groupID: number): Promise<User[]> {
        console.log(`Fetching managers for groupID: ${groupID}`);
        const hotelManagers = await this.usersModel.findAll({where: {HotelGroupID: groupID, RoleID:1}});
        if(hotelManagers.length===0){
            throw new NotFoundException(`Managers with groupID: ${groupID} not found`);
        }
        return hotelManagers;
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
    async login(email: string, password: string): Promise<{ access_token: string }> {
        const user = await this.usersModel.findOne({ where: { Email: email } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const passwordUser = user.getDataValue('Password');
        // Compare the provided password with the stored password (no hashing in this case)
        if (passwordUser !== password) {
            throw new NotFoundException('Invalid credentials');
        }
        console.log('Login successful');
        console.log(user);

       // Generate a JWT token
        const payload = {
        email: user.getDataValue('Email'),
        role: user.getDataValue('RoleID'), // Include any other user details as needed
        userId: user.getDataValue('UserID'),
        };
        const accessToken = this.jwtService.sign(payload);
        console.log(accessToken);
        console.log('Login successful');
        return { access_token: accessToken }; // Return the token in the response
        
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


    // ruta get pe id pt link
    async getLinksByUserId(userId: number): Promise<Link[]> {
        const links = await this.linkModel.findAll({
            where: { UserID: userId }
        });
        return links;
    }
    

    // rute de post tot pe id pt link, in care dam linkul in parametrii
    async createLinkByUserId(id: number, linkURL: string): Promise<Link> {
        const link = await this.linkModel.create({
            UserID: id,        
            LinkURL: linkURL   
        });
        return link; 
    }

    async getPermissionByRoleId(roleId:number):Promise<Permission>{
        const permission = await this.permissionModel.findOne({
            where: {RoleID: roleId}
        });
        return permission;
    }
    
}
