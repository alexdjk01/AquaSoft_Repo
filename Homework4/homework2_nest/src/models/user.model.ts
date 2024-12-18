import {Table,Column,Model,PrimaryKey,AutoIncrement,ForeignKey,BelongsTo, HasOne} from 'sequelize-typescript';
import { Hotel } from './hotel.model.js';
import { Hotel_Group } from './hotel_group.model.js';
import { Role } from './role.model.js';


@Table({
    tableName: 'Users',
    timestamps: false,
})
export class User extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column
    UserID: number;


    @Column
    UserName: string;

    @Column
    Name : string;

    @Column
    Email : string;

    @Column
    Password : string;

    @ForeignKey( ()=>Role)
    @Column
    RoleID : number;

    @ForeignKey( ()=> Hotel)
    @Column ({allowNull :true})
    HotelID : number;

    @ForeignKey( () => Hotel_Group)
    @Column( {allowNull : true})
    HotelGroupID : number;

    @BelongsTo( ()=> Hotel)
    Hotel:Hotel;

    @BelongsTo( ()=> Hotel_Group)
    Hotel_Group:Hotel_Group;

    @BelongsTo( ()=>Role)
    Role:Role;

}