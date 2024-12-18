import {Table,Column,Model,PrimaryKey,AutoIncrement,ForeignKey,BelongsTo} from 'sequelize-typescript';
import { User } from './user.model.js'; 

  @Table({
    tableName: 'links',
    timestamps: false,
  })
  export class Link extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    LinkID: number;

    @Column
    LinkURL: string;
  
    @ForeignKey(() => User)
    @Column
    UserID: number;
  

    @BelongsTo(() => User)
    User: User;
  }
  