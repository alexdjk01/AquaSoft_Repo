import { Model, DataTypes } from "sequelize";
import sequelize from "../sequelize.js";
class City extends Model {
}
City.init({
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
}, {
    sequelize,
    tableName: "Cities",
    timestamps: false,
});
export default City;
