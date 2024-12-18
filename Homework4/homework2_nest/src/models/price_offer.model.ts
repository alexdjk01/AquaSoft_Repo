import {Table,Column,Model,PrimaryKey,AutoIncrement,ForeignKey} from 'sequelize-typescript';
import { Hotel } from './hotel.model.js';


@Table({
    tableName:'price_offers',
    timestamps:false,
})

export class Price_Offer extends Model{


    @PrimaryKey
    @AutoIncrement
    @Column
    OfferID:number;

    @ForeignKey( ()=> Hotel)
    @Column
    HotelID:number

    @Column
    Category:string;        // what kind of room

    @Column
    Price:string;           // price for that room
}