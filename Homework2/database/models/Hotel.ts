import {Model, DataTypes} from "sequelize";
import sequelize from "../sequelize.js";
import City from "./City.js";
import Region from "./Region.js";

class Hotel extends Model{    //this will represent the Hotel table
    public HotelID!:number; //PK
    public HotelName!:string;
    public Latitude!: number; 
    public Longitude!: number; 
    public RegionID!: number;
    public CityID!: number; 
    public Address!: string; 
}

Hotel.init(   //with .init we define de structure of the database tables
    {
      HotelID: {      //define the column of the table and it's proprieties
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      HotelName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      Latitude: {
        type: DataTypes.DECIMAL(9, 6),
        allowNull: false,
      },
      Longitude: {
        type: DataTypes.DECIMAL(9, 6),
        allowNull: false,
      },
      RegionID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      CityID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Address: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,      //this is how we associate the model with the sequelize instance that connects to the database
      tableName: "Hotels",
      timestamps: false,
    }
  );


  
  export default Hotel;