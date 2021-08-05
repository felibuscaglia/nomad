import { Controller, Get, Query } from '@nestjs/common';
import { SalaryCountryService } from './salary-country.service';

@Controller('salary-country')
export class SalaryCountryController {

    constructor(
        private readonly salaryCountryService: SalaryCountryService
    ) { }

    @Get('/')
    async getJobSalaryByCountry(@Query('jobID') jobID: string, @Query('countryID') countryID: string) {
        return await this.salaryCountryService.findJobSalaryFromCountry(jobID, countryID);
    }
}
