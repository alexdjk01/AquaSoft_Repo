import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UsersService } from '../services/users.service.js';
import { User } from '../models/user.model.js';

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

  @Post()
  async createUser(@Body() userData: Partial<User>): Promise<User> {
    return this.usersService.create(userData);
  }

  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() userData: Partial<User>): Promise<User> {
    return this.usersService.update(id, userData);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    return this.usersService.remove(id);
  }
}