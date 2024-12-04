import sequelize from "./sequelize.js";
import Hotel from "./models/Hotel.js";
import City from "./models/City.js";
import Region from "./models/Region.js";
import Zone from "./models/Zone.js";
const fetchHotels = async () => {
    const hotels = await Hotel.findAll();
    console.log("Hotels:", hotels.map(hotel => hotel.toJSON()));
};
const fetchCities = async () => {
    const cities = await City.findAll();
    console.log("Cities:", cities.map(city => city.toJSON()));
};
const fetchRegions = async () => {
    const regions = await Region.findAll();
    console.log("Regions:", regions.map(region => region.toJSON()));
};
const fetchZones = async () => {
    const zones = await Zone.findAll();
    console.log("Zones:", zones.map(zone => zone.toJSON()));
};
const testFetchData = async () => {
    try {
        await sequelize.authenticate(); // Ensure database connection
        console.log("Database connected successfully.");
        await fetchHotels();
        await fetchCities();
        await fetchRegions();
        await fetchZones();
    }
    catch (error) {
        console.error("Error testing fetch data:", error);
    }
    finally {
    }
};
export default testFetchData;
