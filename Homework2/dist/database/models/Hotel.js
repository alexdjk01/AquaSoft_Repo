import { Model, DataTypes } from "sequelize";
import sequelize from "../sequelize.js";
class Hotel extends Model {
}
Hotel.init(//with .init we define de structure of the database tables
{
    HotelID: {
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
}, {
    sequelize, //this is how we associate the model with the sequelize instance that connects to the database
    tableName: "Hotels",
    timestamps: false,
});
export default Hotel;
