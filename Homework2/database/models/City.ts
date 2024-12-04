import { Model, DataTypes } from "sequelize";
import sequelize from "../sequelize.js";
import Hotel from "./Hotel.js";

class City extends Model {  //this will represent the City table
  public CityID!: number; //PK
  public CityName!: string;
  public Country!: string;
}

City.init(
  {
    CityID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    CityName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    Country: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Cities",
    timestamps: false,
  }
);



export default City;