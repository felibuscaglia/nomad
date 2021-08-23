import { NestFactory } from '@nestjs/core';
import { CountriesService } from 'src/countries/countries.service';
import { AppModule } from '../app.module';


async function runAsync() {
    const app = await NestFactory.create(AppModule);
    const countriesService = app.get(CountriesService);

    const allCountries = await countriesService.getAllCountries();
    for (const country of allCountries) {
        await countriesService.syncTravelBriefingData(country);
    }

    process.exit();
}


runAsync();