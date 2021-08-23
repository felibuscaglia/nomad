import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { Ad } from 'src/ads/models/ad.model';
import { CitiesService } from './cities.service';
import { City } from './models/city.model';

@Controller('cities')
export class CitiesController {
    constructor(
        private readonly citiesService: CitiesService
    ) { }

    @Get('/')
    async getCities(@Query('page') page: string): Promise<(City | Ad)[]> {
        return await this.citiesService.getCitiesWithAds(Number(page));
    }

    @Get('/map')
    async getCitiesForMap() {
        return await this.citiesService.getCitiesForMap();
    }

    @Get('/:cityId')
    async getCity(@Param('cityId', ParseIntPipe) cityId: number) {
        return await this.citiesService.getCity(cityId);
    }

    @Get('/search/city')
    async search(@Query('query') query: string) {
        return await this.citiesService.queryCitiesAndCountries(query);
    }
}
