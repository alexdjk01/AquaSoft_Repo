import { HotelsService } from "../services/HotelsService.js";
const hotelService = new HotelsService();
export class HotelsController {
    //Function that receives a request (GET request) and retrieve all the hotels in the response
    async getAllHotels(req, res) {
        const hotels = await hotelService.findAll();
        res.json(hotels);
        res.status(200);
    }
    //Function that receives the name of the hotel we are looking for and return the instance
    //If the hotel with that name exists, it will be returned from the Promise
    async getHotelByName(req, res) {
        const { name } = req.params;
        const hotel = await hotelService.findByName(name);
        if (hotel) {
            res.json(hotel);
            res.status(200); //Status 200 OK
        }
        else
            res.status(404).json({ message: "Hotel couldn't be found in the database!" }); // if not, we raise an 404 not found error.
    }
    //Function that creates an instance of Hotel in the database with the data from the (json) body
    async createHotel(req, res) {
        const hotelData = req.body;
        const newHotel = await hotelService.create(hotelData);
        res.status(201).json(newHotel); //status 201 CREATED
    }
    //Function that updates an instance of Hotel in the database by its ID with the data from the (json) body
    //The update method return the number of rows affected by the change. If it is >0, it means that the updated procedure worked.
    async updateHotel(req, res) {
        const { id } = req.params;
        const hotelData = req.body;
        const [rowsUpdated] = await hotelService.update(Number(id), hotelData);
        if (rowsUpdated > 0)
            res.json({ message: "Hotel updated successfully" });
        else
            res.status(404).json({ message: "Hotel not found" });
    }
    //Function that deletes an instance from the database by its ID
    //The delete method return the number of rows affected by the change. If it is >0, it means that the delete procedure worked.
    async deleteHotel(req, res) {
        const { id } = req.params;
        const rowsDeleted = await hotelService.remove(Number(id)); //Cast it to number because it was received as a string
        if (rowsDeleted > 0)
            res.json({ message: "Hotel deleted successfully" });
        else
            res.status(404).json({ message: "Hotel not found" });
    }
}
