import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Hotel } from '../models/hotel.model.js';

@Injectable()
export class HotelsService {
  constructor(
    @InjectModel(Hotel)
    private readonly hotelModel: typeof Hotel,
  ) {}

  async findAll(): Promise<Hotel[]> {
    return this.hotelModel.findAll();
  }

  async findByName(name: string): Promise<Hotel> {
    const hotel = await this.hotelModel.findOne({ where: { HotelName:name } });
    if (!hotel) {
      throw new NotFoundException('Hotel not found');
    }
    return hotel;
  }

  async create(hotelData: Partial<Hotel>): Promise<Hotel> {
    return this.hotelModel.create(hotelData);
  }

  async update(id: number, hotelData: Partial<Hotel>): Promise<Hotel> {
    const hotel = await this.hotelModel.findByPk(id);
    if (!hotel) {
      throw new NotFoundException('Hotel not found');
    }
    return hotel.update(hotelData);
  }

  async remove(id: number): Promise<void> {
    const hotel = await this.hotelModel.findByPk(id);
    if (!hotel) {
      throw new NotFoundException('Hotel not found');
    }
    await hotel.destroy();
  }
}
