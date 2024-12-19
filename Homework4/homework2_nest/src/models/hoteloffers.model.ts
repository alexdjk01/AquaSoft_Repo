import {Table,Column,Model,PrimaryKey,AutoIncrement,ForeignKey, NotNull} from 'sequelize-typescript';
import { Hotel } from './hotel.model.js';

@Table({
    tableName:'hoteloffers',
    timestamps:false,
})

export class HotelOffers extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column
    OfferID:number;

    @ForeignKey( ()=> Hotel)
    @Column
    HotelID:number;

    @Column
    OfferName:string;

    @Column
    Description:string;

    @Column
    PriceEconomy:string;

    @Column
    PriceStandard:string;

    @Column 
    PriceDeluxe:string;

    @Column
    PriceSuite:string;

    @Column
    PriceLuxury:string;

    @Column
    StartDate: Date;

    @Column 
    EndDate : Date;

}