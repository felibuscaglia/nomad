import { NestFactory } from '@nestjs/core';
import { CountriesService } from 'src/countries/countries.service';
import { AppModule } from '../app.module';


async function runAsync() {
    const app = await NestFactory.create(AppModule);
    const countriesService = app.get(CountriesService);

    await countriesService.getAllCountriesFromAPI();

    process.exit();
}


runAsync();