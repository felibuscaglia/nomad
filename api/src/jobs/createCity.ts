import { NestFactory } from '@nestjs/core';
import { CitiesService } from 'src/cities/cities.service';
import { CountriesService } from 'src/countries/countries.service';
import { AppModule } from '../app.module';


async function runAsync(city: string, country: string) {
    const app = await NestFactory.create(AppModule);
    const citiesService = app.get(CitiesService);
    const countriesService = app.get(CountriesService);

    const cityCountry = await countriesService.findCountry(country);
    const newCity = await citiesService.saveCity(city, cityCountry);

    process.exit();
}


runAsync('Anchorage', 'United States');