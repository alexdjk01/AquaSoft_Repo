import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HotelsModule } from '../modules/hotels.module.js';
import { AuthModule } from '../auth/auth.module.js';
import { DB_DIALECT, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME } from '../constants.js';
import { Hotel } from '../models/hotel.model.js';
import { Hotel_Group } from '../models/hotel_group.model.js';
import { City } from '../models/city.model.js';
import { Zone } from '../models/zone.model.js';
import { Region } from '../models/region.model.js';
import { Airport } from '../models/airport.model.js';
import { Price_Offer } from '../models/price_offer.model.js';


@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: DB_DIALECT,
      host: DB_HOST,
      port: DB_PORT,
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_NAME,
      models: [Hotel,Hotel_Group, City, Zone, Region, Airport, Price_Offer],
      autoLoadModels: true,
      synchronize: true,
    }),
    HotelsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
