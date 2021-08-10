import { NestFactory } from '@nestjs/core';
import { CountriesService } from '../countries/countries.service';
import { AppModule } from '../app.module';
import { SalaryService } from '../salary/salary.service';
import { CitiesService } from '../cities/cities.service';
const prompt = require('prompt');


async function runAsync() {
    const app = await NestFactory.create(AppModule);
    const countrySalaryService = app.get(SalaryService);
    const countryService = app.get(CountriesService);
    const citiesService = app.get(CitiesService);

    // const allCountries = await countryService.getAllCountries();

    // for (const country of allCountries) {
    //     await countryService.getCountrySalary(country);
    // }

    const allCities = await citiesService.getAllCities();

    for (const city of allCities) {
        await citiesService.syncCitySalaries(city);
    }

    process.exit();
}


runAsync();