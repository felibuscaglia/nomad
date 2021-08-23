import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryWeatherService } from './country-weather.service';
import { CountryWeather } from './models/country-weather.model';

@Module({
  providers: [CountryWeatherService],
  imports: [TypeOrmModule.forFeature([CountryWeather])],
  exports: [CountryWeatherService]
})
export class CountryWeatherModule {}
