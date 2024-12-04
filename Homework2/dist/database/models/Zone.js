import { Model, DataTypes } from "sequelize";
import sequelize from "../sequelize.js";
class Zone extends Model {
}
Zone.init({
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
}, {
    sequelize,
    tableName: "Zones",
    timestamps: false,
});
export default Zone;
