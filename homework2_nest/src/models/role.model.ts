import {Table,Column,Model,PrimaryKey,AutoIncrement,} from 'sequelize-typescript';
  
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
  }
  