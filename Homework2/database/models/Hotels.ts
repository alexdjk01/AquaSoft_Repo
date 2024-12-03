import {Model, DataTypes} from "sequelize";
import sequelize from "../sequelize";

class Hotel extends Model{
    public HotelID!:number; //PK
    public HotelName!:string;
    public Latitude!: number; 
    public Longitude!: number; 
    public RegionID!: number;
    public CityID!: number; 
    public Address!: string; 
}


export default Hotel;