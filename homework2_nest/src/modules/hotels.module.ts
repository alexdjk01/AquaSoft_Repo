import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HotelsService } from '../services/hotels.service.js';
import { HotelsController } from '../controllers/hotels.controller.js';
import { Hotel } from '../models/hotel.model.js';
import { City } from '../models/city.model.js';
import { Region } from '../models/region.model.js';
import { Zone } from '../models/zone.model.js';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET_KEY } from '../constants.js';

@Module({
  imports: [
    SequelizeModule.forFeature([Hotel, City, Region, Zone]),
    JwtModule.register({
      secret: JWT_SECRET_KEY, 
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [HotelsService],
  controllers: [HotelsController],
})
export class HotelsModule {}
