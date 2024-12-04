import { Model, DataTypes } from "sequelize";
import sequelize from "../sequelize.js";
import Region from "./Region.js";

class Zone extends Model {  //this will represent the Zone table
  public ZoneID!: number;  //PK
  public RegionID!: number;
  public ZoneName!: string;
}

Zone.init(
  {
    ZoneID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    RegionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ZoneName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Zones",
    timestamps: false,
  }
);


export default Zone;