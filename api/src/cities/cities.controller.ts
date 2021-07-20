import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { Ad } from 'src/ads/models/ad.model';
import { CityPillarsService } from 'src/city-pillars/city-pillars.service';
import { CitiesService } from './cities.service';
import { City } from './models/city.model';

@Controller('cities')
export class CitiesController {
    constructor(
        private readonly citiesService: CitiesService,
        private readonly cityPillarsService: CityPillarsService
    ) { }

    @Get('/gallery')
    async getRandomCities() {
        return await this.citiesService.getRandomCity();
    }

    @Get('/')
    async getCities(@Query('page') page: string): Promise<(City | Ad)[]> {
        return await this.citiesService.getCitiesWithAds(Number(page));
    }

    @Get(':cityId')
    async getCity(@Param('cityId', ParseIntPipe) cityId: number) {
        return await this.citiesService.getCity(cityId);
    }
}
