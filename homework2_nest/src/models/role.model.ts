import {Table,Column,Model,PrimaryKey,AutoIncrement, HasMany,} from 'sequelize-typescript';
import { User } from './user.model.js';
  
  @Table({
    tableName: 'Roles',
    timestamps: false,
  })
  export class Role extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    RoleID: number;
  
    @Column
    RoleName: string;
  
    @Column
    Description: string;
    
    @HasMany(() => User) 
    Users: User[];
  }
  