import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HotelsModule } from '../modules/hotels.module.js';
import { AuthModule } from '../auth/auth.module.js';
import { DB_DIALECT, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME } from '../constants.js';


@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: DB_DIALECT,
      host: DB_HOST,
      port: DB_PORT,
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_NAME,
      models: [],
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
