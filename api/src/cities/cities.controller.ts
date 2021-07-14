import { Controller, Get, Query } from '@nestjs/common';
import { Ad } from 'src/ads/models/ad.model';
import { CitiesService } from './cities.service';
import { City } from './models/city.model';

@Controller('cities')
export class CitiesController {
    constructor(
        private readonly citiesService: CitiesService
    ) { }

    @Get('/gallery')
    async getRandomCities() {
        return await this.citiesService.getRandomCity();
    }

    @Get('/')
    async getCities(@Query('page') page: string): Promise<(City | Ad)[]> {
        return await this.citiesService.getCitiesWithAds(Number(page));
    }
}
