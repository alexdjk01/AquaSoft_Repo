import sequelize from "./sequelize.js";
//load each model even if we dont use them in order to ensure that Sequelize loads thier definition and relationships properly
import Hotel from "./models/Hotel.js";
import City from "./models/City.js";
import Region from "./models/Region.js";
import Zone from "./models/Zone.js";

const initializeModels = async () => {
  try {

    // Establish relationships
    Hotel.belongsTo(City, { foreignKey: "CityID" });
    Hotel.belongsTo(Region, { foreignKey: "RegionID" });
    City.hasMany(Hotel, { foreignKey: "CityID" });
    Region.hasMany(Hotel, { foreignKey: "RegionID" });
    Region.hasMany(Zone, { foreignKey: "RegionID" });
    Zone.belongsTo(Region, { foreignKey: "RegionID" });

    await sequelize.sync({ alter: true }); // Sync all models with the database
    console.log("All models have been synchronized successfully!");
  } catch (error) {
    console.error("Error at: Initializing models:", error);
  }
};

export default initializeModels;
