import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MonthWeather } from '../countries/interfaces';
import { Country } from '../countries/models/country.model';
import { CountryWeather } from './models/country-weather.model';

@Injectable()
export class CountryWeatherService {
    constructor(
        @InjectRepository(CountryWeather)
        private readonly countryWeatherRepository: Repository<CountryWeather>
    ) { }

    buildAndSaveCountryWeatherService = async (month: string, country: Country, weatherDataDTO: MonthWeather) => {
        const countryWeather: CountryWeather = {
            month,
            country,
            tAvg: Math.round(Number(weatherDataDTO.tAvg)),
            pAvg: Math.round(Number(weatherDataDTO.pAvg))
        }
        await this.countryWeatherRepository.save(countryWeather);
    }
}
