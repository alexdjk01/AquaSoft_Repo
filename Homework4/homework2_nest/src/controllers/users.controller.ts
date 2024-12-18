import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UsersService } from '../services/users.service.js';
import { User } from '../models/user.model.js';
import { JwtService } from '@nestjs/jwt';
import { Hotel_Group } from '../models/hotel_group.model.js';
import { Hotel } from '../models/hotel.model.js';
import {Link} from '../models/link.model.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':username')
  async getUserByUserName(@Param('username') username: string): Promise<User> {
    return this.usersService.findByUserName(username)
;
  }

  @Get('/findById/:id')
  async getUserById(@Param('id') id: number): Promise<User> {
    return this.usersService.findByUserId(id);
  }

  @Get('retrieveManagers/:groupID')
  async getHotelManagersByGroup(@Param('groupID') groupID: number): Promise<User[]> {
    return this.usersService.getHotelManagersByGroup(groupID);
  }

  @Post('register')
  async createUser(
    @Body('UserName') UserName: string,  
    @Body('Name') Name: string,  
    @Body('Email') Email: string,  
    @Body('Password') Password: string  
  ): Promise<User> {
    return this.usersService.create({ UserName, Name, Email, Password });
  }

  @Post('login')
  async login(
    @Body('Email') Email: string,  
    @Body('Password') Password: string  
  ): Promise<{ access_token: string } > {
    return this.usersService.login(Email, Password);
  }

  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() userData: Partial<User>): Promise<User> {
    return this.usersService.update(id, userData);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    return this.usersService.remove(id);
  }


  @Get('/getLink/:id')
  async getLinksByUserId(@Param('id') id: number):Promise<Link[]>{
      return this.usersService.getLinksByUserId(id);
  }

  @Post('/createLinkByUserId')
  async  createLinkByUserId (@Body('UserID') UserID: number, @Body('LinkURL') LinkURL: string):Promise<Link> {
    return this.usersService.createLinkByUserId(UserID, LinkURL);
  }


}