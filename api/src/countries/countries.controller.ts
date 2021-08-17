import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
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

    @Get('/:countryID')
    async getCountry(@Param('countryID', ParseIntPipe) countryID: number) {
        return await this.countriesService.getCountryById(countryID);
    }
}
