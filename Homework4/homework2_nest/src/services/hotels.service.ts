import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Hotel } from '../models/hotel.model.js';
import { Airport } from '../models/airport.model.js';
import { Price_Offer } from '../models/price_offer.model.js';
import { calculateDistanceCoordonates } from '../utils/distance.utils.js';
import { HotelOffers } from '../models/hoteloffers.model.js';

@Injectable()
export class HotelsService {
  constructor(            // Using Nest Dependency Injection - injected all models into this service
    @InjectModel(Hotel)     
    private readonly hotelModel: typeof Hotel,
    @InjectModel(Airport)
    private readonly airportModel: typeof Airport,
    @InjectModel(Price_Offer)
    private readonly priceOfferModel: typeof Price_Offer,
    @InjectModel(HotelOffers)
    private readonly hotelOfferModel: typeof HotelOffers,
  ) {}

  //Method that retrieves all hotels for the database
  async findAll(): Promise<Hotel[]> {
    return this.hotelModel.findAll();
  }

  //Method the retrieved a hotel with the name specified
  async findByName(name: string): Promise<Hotel> {
    const hotel = await this.hotelModel.findOne({ where: { HotelName:name } });
    if (!hotel) {
      throw new NotFoundException('Hotel not found');
    }
    return hotel;
  }

  //Method to create a new hotel instance in the Hotel database
  async create(hotelData: Partial<Hotel>): Promise<Hotel> {
    return this.hotelModel.create(hotelData);
  }

  //Method to update the fields of a specific hotel in the database
  async update(id: number, hotelData: Partial<Hotel>): Promise<Hotel> {
    const hotel = await this.hotelModel.findByPk(id);
    if (!hotel) {
      throw new NotFoundException('Hotel not found');
    }
    return hotel.update(hotelData);
  }

  //Method to delete a hotel instance from the database
  async remove(id: number): Promise<void> {
    const hotel = await this.hotelModel.findByPk(id);
    if (!hotel) {
      throw new NotFoundException('Hotel not found');
    }
    await hotel.destroy();
  }

  //Method to retrieve the closest hotel with the best offer from a airport
  async getClosestHotel(IataCode:string)
  {
    //Retrieve the airport using its name
    const airport: Airport = await this.airportModel.findOne( {where:{IataCode:IataCode}});
    //check if the airport has been retrieved 
    if(!airport)
        throw new Error(`The airport -- ${IataCode} -- was not found in the database!`);
    //Retrieve all the hotels in order to map them to thier distance from the airport to get the closest one
    const hotels:Hotel[] = await this.hotelModel.findAll();

    //Check if we have hotels in the database
    if (!hotels.length) {
      throw new Error('No hotels found in the database!');
    }
    //Create an array of hotels bojects plus the distance field
    const hotelsPlusDistances = hotels.map( (hotel) => {
      const airportLatitude:number =  parseFloat(airport.getDataValue('Latitude'));
      const airportLongitude:number =  parseFloat(airport.getDataValue('Longitude'));
      const hotelLatitude:number =  parseFloat(hotel.getDataValue('Latitude'));
      const hotelLongitude:number =  parseFloat(hotel.getDataValue('Longitude'));
      const distanceFromAirport:number = calculateDistanceCoordonates(airportLatitude, airportLongitude,hotelLatitude,hotelLongitude);
      //Return the new objects consisting of the hotel object plus the distance field from airport
      return { ...hotel.toJSON(), Distance:distanceFromAirport};
    });

    //Get the closest hotel from the airport
    const closestHotel = hotelsPlusDistances.reduce((closest, current) => {
      return closest.Distance < current.Distance ? closest : current;
    });
    

    //Check if the closest hotel exists
    if(!closestHotel)
      throw new Error(`The hotel -- ${closestHotel.HotelName} -- was not found in the database!`);

    //Retrieve all offers for the closest hotel
    const closestHotelOffers = await this.priceOfferModel.findAll( {
      where: { HotelID:closestHotel.HotelID},
    });

    //Check if the closest hotel exists
    if(!closestHotelOffers)
      throw new Error('No offers for the closest hotel found!');

    return {
      Hotel: closestHotel,
      PriceOffers: closestHotelOffers,
    };
  }

  //Task: se cere o lista cu cele mai bune oferte din apropierea unui anumit aeroport (de ex pe o raza de 50 km), in ordinea crescatoare a pretului
  async getBestOffers(IataCode:string, distanceRange:number)
  {
     //Retrieve the airport using its name
     const airport: Airport = await this.airportModel.findOne( {where:{IataCode:IataCode}});
     //check if the airport has been retrieved 
     if(!airport)
         throw new Error(`The airport -- ${IataCode} -- was not found in the database!`);
     //Retrieve all the hotels in order to map them to thier distance from the airport to get the closest one
     const hotels = await this.hotelModel.findAll();
     //Check if we have hotels in the database
     if (!hotels.length) {
       throw new Error('No hotels found in the database!');
     }

     //Create an array of hotels bojects plus the distance field
    const hotelsPlusDistances = hotels.map( (hotel) => {
      const airportLatitude:number =  parseFloat(airport.getDataValue('Latitude'));
      const airportLongitude:number =  parseFloat(airport.getDataValue('Longitude'));
      const hotelLatitude:number =  parseFloat(hotel.getDataValue('Latitude'));
      const hotelLongitude:number =  parseFloat(hotel.getDataValue('Longitude'));
      const distanceFromAirport:number = calculateDistanceCoordonates(airportLatitude, airportLongitude,hotelLatitude,hotelLongitude);
      console.log('Calculated Distance:', distanceFromAirport);
      //Return the new objects consisting of the hotel object plus the distance field from airport
      return { ...hotel.toJSON(), Distance:distanceFromAirport};
    });

    //Filter the hotel array and create a new array with only the hotels in range( specified in params route)
    const hotelsInRange = hotelsPlusDistances.filter((hotel)=>  parseFloat(hotel.Distance) <= distanceRange);

    //Create a new combination of Hotel and Offers by receiving the lowest price for a room for the hotes in range
    const bestOffers = await Promise.all(
      hotelsInRange.map(async (hotel) => {
        const bestOption = await this.priceOfferModel.findOne({
          where: {HotelID : hotel.HotelID},
          order: [['Price','ASC']],
        });
        return{
          BestOption: bestOption,
          Hotel: {
            HotelName: hotel.HotelName,
            Address: hotel.Address,
            Distance: hotel.Distance,
                }
        }
      })
    );

    //Filter the hotels with the offers to not display any hotes which is not giving an offer
    const filteredOffers = bestOffers.filter((offer) => offer.BestOption !== null);

    //Sort the array of offers from the best (lowest price) to the worst (highest price)
    const sortedAscendingOffers = filteredOffers.sort((x, y) => {
       // Ensure prices are parsed as numbers before comparison
        const priceX:number = parseFloat(x.BestOption.getDataValue('Price'));
        const priceY:number = parseFloat(y.BestOption.getDataValue('Price'));
        if (priceX !== priceY) {
        return priceX - priceY; // Sort by ascending price
        }
        //But if the prices are equal, we need to sort also by distance to get the best offer
        const distanceX = parseFloat(x.Hotel.Distance);
        const distanceY = parseFloat(y.Hotel.Distance);
        return distanceX - distanceY; // Sort by ascending distance
    });
    
    return sortedAscendingOffers;
  }

  //Task: Try to make a scoring criteria // the lower the score the better!
  async getBestOffersByScore(IataCode: string, distanceRange: number, distanceWeight: number = 10) {    //default value 10 (distance is important to the users)
    // Retrieve the airport using its name
    const airport: Airport = await this.airportModel.findOne({ where: { IataCode } });
    if (!airport) throw new Error(`The airport -- ${IataCode} -- was not found in the database!`);
  
    // Retrieve all hotels
    const hotels = await this.hotelModel.findAll();
    if (!hotels.length) throw new Error('No hotels found in the database!');
  
    // Map hotels to include distance
    const hotelsPlusDistances = hotels.map((hotel) => {
      const airportLatitude = parseFloat(airport.getDataValue('Latitude'));
      const airportLongitude = parseFloat(airport.getDataValue('Longitude'));
      const hotelLatitude = parseFloat(hotel.getDataValue('Latitude'));
      const hotelLongitude = parseFloat(hotel.getDataValue('Longitude'));
      const distanceFromAirport = calculateDistanceCoordonates(
        airportLatitude,
        airportLongitude,
        hotelLatitude,
        hotelLongitude
      );
      return { ...hotel.toJSON(), Distance: distanceFromAirport };
    });
  
    // Filter hotels in range
    const hotelsInRange = hotelsPlusDistances.filter(
      (hotel) => parseFloat(hotel.Distance) <= distanceRange
    );
  
    // Fetch best offers for each hotel and calculate score
    const bestOffers = await Promise.all(
      hotelsInRange.map(async (hotel) => {
        const bestOption = await this.priceOfferModel.findOne({
          where: { HotelID: hotel.HotelID },
          order: [['Price', 'ASC']],
        });
        if (!bestOption) return null; // Return null for the hotes with no offer 
  
        const price = parseFloat(bestOption.getDataValue('Price'));
        const distance = parseFloat(hotel.Distance);
        // Calculate score
        const score = price + distance * distanceWeight;
  
        return {
          Offer: {
            Hotel: hotel.HotelName,
            Price: price,
            Category: bestOption.getDataValue('Category'),
            Distance: distance,
            Score: score,
          },
        };
      })
    );
    // Filter out hotels with no offers
    const filteredOffers = bestOffers.filter((offer) => offer !== null);
    // Sort by score
    const sortedByScore = filteredOffers.sort((x, y) => x.Offer.Score - y.Offer.Score);
  
    return sortedByScore;
  }
  
  // ############################## LOGIC FOR HOTEL OFFERS ###################33
  async findAllOffers(): Promise<HotelOffers[]> {
    return this.hotelOfferModel.findAll();
  }

  async findOfferById(id: number): Promise<HotelOffers> {
    return this.hotelOfferModel.findByPk(id);
  }

  async findOffersHotelById(id: number): Promise<HotelOffers[]> {
    return this.hotelOfferModel.findAll({
        where: { HotelID: id }
    });
  }


  //create a new offer (issue and store)
  async issueOffer(hotelOffer: Partial<HotelOffers>): Promise<HotelOffers> {
    return this.hotelOfferModel.create(hotelOffer);
  }

  //remove an existing offer (manage)
  async removeOfferById(id: number): Promise<void> {
    const hotelOffer = await this.hotelOfferModel.findByPk(id);
    if (!hotelOffer) {
      throw new NotFoundException('Hotel offer not found');
    }
    await hotelOffer.destroy();
  }

  //update the data from an existing hotel offer (change) 
  async updateOfferById(id: number, hotelOfferData: Partial<HotelOffers>): Promise<HotelOffers> {
    const hotelOffer = await this.hotelOfferModel.findByPk(id);
    if (!hotelOffer) {
      throw new NotFoundException('Hotel offer not found');
    }
    return hotelOffer.update(hotelOfferData);
  }


}
