import { Controller, Get } from '@nestjs/common';
import { CountriesService } from './countries.service';

@Controller('countries')
export class CountriesController {
    constructor(
        private readonly countriesService: CountriesService
    ) { }

    @Get('/random')
    async getRandomCountries() {
        return await this.countriesService.getRandomCountries();
    }
}
