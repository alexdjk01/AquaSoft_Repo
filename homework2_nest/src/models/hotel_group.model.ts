import {Table,Column,Model,PrimaryKey,AutoIncrement, HasMany} from 'sequelize-typescript';
import { Hotel } from './hotel.model.js';

@Table({
    tableName:'Hotel_Groups',
    timestamps:false,
})

export class Hotel_Group extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column
    GroupID:number;

    @Column
    GroupName:string;

    @Column
    CoveredArea:string;  // A hotel group can function nationally or internatinally (global)

    @HasMany( ()=>Hotel)
    Hotels:Hotel[];
}