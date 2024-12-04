import { Model, DataTypes } from "sequelize";
import sequelize from "../sequelize.js";
import Hotel from "./Hotel.js";
import Zone from "./Zone.js";

class Region extends Model {  //this will represent the Region table
  public RegionID!: number;  //PK
  public RegionName!: string;
  public Country!: string;
}

Region.init(
  {
    RegionID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    RegionName: {
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
    tableName: "Regions",
    timestamps: false,
  }
);


export default Region;