import {Controller,Get,Post,Put,Delete,Param,Body,UseGuards,} from '@nestjs/common';
import { HotelsService } from '../services/hotels.service.js';
import { Hotel } from '../models/hotel.model.js';
import { JwtAuthGuard } from '../auth/jwtAuthentification.guard.js';
import { HotelOffers } from '../models/hoteloffers.model.js';


@Controller('hotels')
export class HotelsController {
constructor(private readonly hotelsService: HotelsService) {}

    @Get()
    findAll(): Promise<Hotel[]> {
        return this.hotelsService.findAll();
    }

    @Get('getByName/:name')
    findByName(@Param('name') name: string): Promise<Hotel> {
        return this.hotelsService.findByName(name);
    }

    @Post()
    //@UseGuards(JwtAuthGuard) //private route
    create(@Body() hotelData: Partial<Hotel>): Promise<Hotel> {
        return this.hotelsService.create(hotelData);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() hotelData: Partial<Hotel>,): Promise<Hotel> {
        return this.hotelsService.update(id, hotelData);
    }

    @Delete(':id')
    remove(@Param('id') id: number): Promise<void> {
        return this.hotelsService.remove(id);
    }

    @Get('closestHotel/:IataCode')
    async getClosestHotel(@Param('IataCode') IataCode:string){
        return this.hotelsService.getClosestHotel(IataCode);
    }

    @Get('bestOffers/:IataCode/:distanceRange')
    async getBestOffers(@Param('IataCode') IataCode:string , @Param('distanceRange') distanceRange:number){
        return this.hotelsService.getBestOffers(IataCode,distanceRange);
    }

    @Get('bestOffersByScore/:IataCode/:distanceRange')
    async getBestOffersByScore(@Param('IataCode') IataCode:string , @Param('distanceRange') distanceRange:number){
        return this.hotelsService.getBestOffersByScore(IataCode,distanceRange);
    }

    @Get('findAllOffers')
    async findAllOffers():Promise<HotelOffers[]>{
        return this.hotelsService.findAllOffers();
    }

    @Get('getOfferById/:id')
    async findOfferById(@Param('id') id:number):Promise<HotelOffers>{
        return this.hotelsService.findOfferById(id);
    }

    @Get('getOffersHotelById/:id')
    async findOffersHotelById(@Param('id') id:number):Promise<HotelOffers[]>{
        return this.hotelsService.findOffersHotelById(id);
    }

    @Post('addOffer')
    async addOffer(@Body() hotelOfferData:Partial<HotelOffers>):Promise<HotelOffers>{
        return this.hotelsService.issueOffer(hotelOfferData);
    }

    @Put('updateOffer/:id')
    async updateOffer(@Param('id') id: number, @Body() hotelOfferData: Partial<HotelOffers>,): Promise<HotelOffers> {
        return this.hotelsService.updateOfferById(id, hotelOfferData);
    }

    @Delete('deleteOfferById/:id')
    async deleteOfferById(@Param('id') id:number):Promise<void>{
        return this.hotelsService.removeOfferById(id);
    }

}
  