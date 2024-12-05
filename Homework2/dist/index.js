import sequelize from "./database/sequelize.js";
import initializeModels from "./database/initializeModels.js";
import testFetchData from "./database/testData.js";
import hotelRoutes from './database/routes/HotelsRouter.js';
import express from "express";
import dotenv from "dotenv";
dotenv.config();
const APP_PORT = Number(process.env.APP_PORT);
const app = express();
const startServer = async () => {
    try {
        // MySQL connection
        await sequelize.authenticate(); //Test the connection to the DB.
        console.log("Database connection has been established with success.");
        // Initialize Models and thier relationship and sync them with the database | test if the data can be received from DB
        await initializeModels();
        await testFetchData();
        // Configure middleware that parses JSON bodies in order to handle API requests
        app.use(express.json()); // Parse JSON bodies
        // Define routes ( in this example we have just the hotels route )
        app.use("/hotels", hotelRoutes);
        // Start the server on specific port taken from .env file
        app.listen(APP_PORT, () => {
            console.log(`Server running on http://localhost:${APP_PORT}`);
        });
        // If everything works, application is ready and working.
        console.log("Application is now ready.");
    }
    catch (error) {
        console.error(error);
        process.exit(1); // Exit the process if initialization fails
    }
};
startServer();
