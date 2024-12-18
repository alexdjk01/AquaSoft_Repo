import {Table,Column,Model,PrimaryKey,AutoIncrement,ForeignKey,BelongsTo, HasMany} from 'sequelize-typescript';
import { Region } from './region.model.js';
import { City } from './city.model.js';
import { Hotel_Group } from './hotel_group.model.js';
import { Price_Offer } from './price_offer.model.js';
import { HotelOffers } from './hoteloffers.model.js';
  
  @Table({
    tableName: 'Hotels',
    timestamps: false,
  })
  export class Hotel extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    HotelID: number;
  
    @Column
    HotelName: string;
  
    @Column
    Latitude: string;     //DECIMALS are imported into TS/JS as STRING
  
    @Column
    Longitude: string;    //DECIMALS are imported into TS/JS as STRING
  
    @ForeignKey(() => Region)
    @Column
    RegionID: number;
  
    @ForeignKey(() => City)
    @Column
    CityID: number;

    @ForeignKey( () => Hotel_Group)
    @Column
    GroupID: number;
  
    @Column
    Address: string;

    @BelongsTo(() => City)
    City: City;
  
    @BelongsTo(() => Region)
    Region: Region;

    @BelongsTo(()=> Hotel_Group)
    Hotel_Group: Hotel_Group;

    @HasMany( () => Price_Offer)
    Price_Offers:Price_Offer[];

    @HasMany( () => HotelOffers)
    HotelOffers:Price_Offer[];

  }
  