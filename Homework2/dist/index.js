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
        // We will authenticate the connection to the MySql database
        await sequelize.authenticate();
        console.log("Database connection has been established with success.");
        // Initialize models and relationships
        await initializeModels();
        await testFetchData();
        // Configure middleware
        app.use(express.json()); // Parse JSON bodies
        // Define routes
        app.use("/hotels", hotelRoutes);
        // Start the server
        app.listen(APP_PORT, () => {
            console.log(`Server running on http://localhost:${APP_PORT}`);
        });
        // Application
        console.log("Application is now ready.");
    }
    catch (error) {
        console.error("Failed to start the application:", error);
        process.exit(1); // Exit the process if initialization fails
    }
};
startServer();
