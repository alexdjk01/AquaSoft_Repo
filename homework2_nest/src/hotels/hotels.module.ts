import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HotelsService } from './hotels.service';
import { HotelsController } from './hotels.controller';
import { Hotel } from './hotel.model';
import { City } from './city.model';
import { Region } from './region.model';
import { Zone } from './zone.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Hotel, City, Region, Zone]),
  ],
  providers: [HotelsService],
  controllers: [HotelsController],
})
export class HotelsModule {}
