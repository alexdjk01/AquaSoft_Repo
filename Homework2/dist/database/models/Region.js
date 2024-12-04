import { Model, DataTypes } from "sequelize";
import sequelize from "../sequelize.js";
class Region extends Model {
}
Region.init({
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
}, {
    sequelize,
    tableName: "Regions",
    timestamps: false,
});
export default Region;
