import { NestFactory } from '@nestjs/core';
import { CitiesService } from '../cities/cities.service';
import { SubPillarsService } from '../sub-pillars/sub-pillars.service';
import { AppModule } from '../app.module';


async function runAsync() {
    const app = await NestFactory.create(AppModule);
    const citiesService = app.get(CitiesService);
    const subPillarsService = app.get(SubPillarsService);

    const allCities = await citiesService.getAllCities();
    for (const city of allCities) {
        await subPillarsService.getCityDetails(city);
    }

    process.exit();
}


runAsync();