import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HotelsService } from '../services/hotels.service';
import { HotelsController } from '../controllers/hotels.controller';
import { Hotel } from '../models/hotel.model';
import { City } from '../models/city.model';
import { Region } from '../models/region.model';
import { Zone } from '../models/zone.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Hotel, City, Region, Zone]),
  ],
  providers: [HotelsService],
  controllers: [HotelsController],
})
export class HotelsModule {}
