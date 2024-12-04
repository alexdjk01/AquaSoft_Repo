import express from "express";
import { HotelsController } from "../controllers/HotelsController.js";

//Define the express Router that will help us manage routes
const expressRouter = express.Router();     
const hotelsController =  new HotelsController();

//Define routes
expressRouter.get("/", (req, res) => hotelsController.getAllHotels(req, res));
expressRouter.get("/:name", (req, res) => hotelsController.getHotelByName(req, res));
expressRouter.post("/", (req, res) => hotelsController.createHotel(req, res));
expressRouter.put("/:id", (req, res) => hotelsController.updateHotel(req, res));
expressRouter.delete("/:id", (req, res) => hotelsController.deleteHotel(req, res));

export default expressRouter;