import { Controller, Get } from '@nestjs/common';
import { CitiesService } from './cities.service';

@Controller('cities')
export class CitiesController {
    constructor(
        private readonly citiesService: CitiesService
    ) { }

    @Get('/gallery')
    async getRandomCities() {
        return await this.citiesService.getRandomCity();
    }
}
