import {Table,Column,Model,PrimaryKey,AutoIncrement,ForeignKey,BelongsTo} from 'sequelize-typescript';
import { City } from './city.model.js';

@Table({
    tableName:'Airports',
    timestamps:false,
})

export class Airports extends Model{

    @PrimaryKey
    @AutoIncrement
    @Column
    AirportID:number;

    @Column
    AirportName:string;

    @Column
    Description:string;

    @Column
    IataCode:string;

    @Column
    AirportType:string;         // The type of an airport may be: Private or Public/Comercial

    @Column
    TimeZone:string;            // GMT Time zone for where the Airport is located.

    @Column
    Latitude:number;

    @Column
    Longitude:number;

    @ForeignKey( () => City)
    @Column
    CityID:number;

    @BelongsTo( () =>City)
    City:City;
}