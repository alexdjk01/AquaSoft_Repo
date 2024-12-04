import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HotelsModule } from './hotels/hotels.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
