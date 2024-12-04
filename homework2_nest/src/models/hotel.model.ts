import {Table,Column,Model,PrimaryKey,AutoIncrement,ForeignKey,BelongsTo ,} from 'sequelize-typescript';
  import { Region } from './region.model';
  import { City } from './city.model';
  
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
    Latitude: number;
  
    @Column
    Longitude: number;
  
    @ForeignKey(() => Region)
    @Column
    RegionID: number;
  
    @ForeignKey(() => City)
    @Column
    CityID: number;
  
    @Column
    Address: string;

    @BelongsTo(() => City)
    City: City;
  
    @BelongsTo(() => Region)
    Region: Region;
  }
  