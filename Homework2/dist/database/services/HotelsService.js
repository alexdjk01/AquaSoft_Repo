import Hotel from "../models/Hotel.js";
export class HotelsService {
    //Find all hotels in the database
    async findAll() {
        return await Hotel.findAll();
    }
    //Finds the first hotel with that specific name
    async findByName(name) {
        return await Hotel.findOne({ where: { HotelName: name } });
    }
    //Creates a new entry in the database with values provided
    //Partial sets all the properties of that type (Hotel in this case) to optional
    async create(hotelData) {
        return await Hotel.create(hotelData);
    }
    //Updates a specific instance in the database by their ID
    async update(id, hotelData) {
        return await Hotel.update(hotelData, { where: { HotelID: id } });
    }
    //Removes the instance form the database by its ID
    async remove(id) {
        return await Hotel.destroy({ where: { HotelID: id } });
    }
}
