import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HotelsService } from '../services/hotels.service';
import { HotelsController } from '../controllers/hotels.controller';
import { Hotel } from '../models/hotel.model';
import { City } from '../models/city.model';
import { Region } from '../models/region.model';
import { Zone } from '../models/zone.model';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from '../auth/jwtAuthentification.guard';

@Module({
  imports: [
    SequelizeModule.forFeature([Hotel, City, Region, Zone]),
    JwtModule.register({
      secret: 'encodingKeyAlex', // Use the same secret key as in AuthService
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [HotelsService],
  controllers: [HotelsController],
})
export class HotelsModule {}
