import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../models/user.model.js';
import { UsersService } from '../services/users.service.js';
import { UsersController } from '../controllers/users.controller.js';
import { Permission } from '../models/permission.model.js';
import { Role } from '../models/role.model.js';
import { AuthModule } from '../auth/auth.module.js'; 
import { Hotel_Group } from '../models/hotel_group.model.js';
import { Hotel } from '../models/hotel.model.js';
import {Link} from '../models/link.model.js'

@Module({
  imports: [SequelizeModule.forFeature([User, Permission, Role,Hotel_Group, Hotel,Link]),
  AuthModule,], 
  controllers: [UsersController], 
  providers: [UsersService], 
  exports: [UsersService], 
})
export class UsersModule {}
