import {Table,Column,Model,PrimaryKey,AutoIncrement,ForeignKey,BelongsTo} from 'sequelize-typescript';
import { Role } from './role.model';
  
  @Table({
    tableName: 'Permissions',
    timestamps: false,
  })
  export class Permission extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    PermissionID: number;
  
    @ForeignKey(() => Role)
    @Column
    RoleID: number;
  
    @Column
    ReadPermission: boolean;
  
    @Column
    WritePermission: boolean;

    @BelongsTo(() => Role)
        Role: Role;
  }
  