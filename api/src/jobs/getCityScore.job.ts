import { NestFactory } from '@nestjs/core';
import { CitiesService } from 'src/cities/cities.service';
import { AppModule } from '../app.module';


async function runAsync(id: number) {
    const app = await NestFactory.create(AppModule);
    const citiesService = app.get(CitiesService);

    const city = await citiesService.getCity(id);
    await citiesService.getCityScores(city, 'bangkok');

    process.exit();
}


runAsync(4948);