import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HotelsModule } from '../modules/hotels.module.js';
import { AuthModule } from '../auth/auth.module.js';


@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'practice_hm2',
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
