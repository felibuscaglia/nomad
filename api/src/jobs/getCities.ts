import { NestFactory } from '@nestjs/core';
import { CitiesService } from 'src/cities/cities.service';
import { AppModule } from '../app.module';


async function runAsync(limit: number) {
    const app = await NestFactory.create(AppModule);
    const citiesService = app.get(CitiesService);

    await citiesService.getCitiesFromAPI(limit);

    process.exit();
}


runAsync(50);