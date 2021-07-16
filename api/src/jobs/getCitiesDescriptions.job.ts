import { NestFactory } from '@nestjs/core';
import { CitiesService } from 'src/cities/cities.service';
import { AppModule } from '../app.module';


async function runAsync() {
    const app = await NestFactory.create(AppModule);
    const citiesService = app.get(CitiesService);

    const allCities = await citiesService.getAllCities();

    for (const city of allCities) {
        city.description = await citiesService.getCityDescriptions(city.name);
        await citiesService.updateCity(city);
    }

    process.exit();
}


runAsync();