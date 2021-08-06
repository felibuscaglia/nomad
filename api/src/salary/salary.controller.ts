import { Controller, Get, Query } from '@nestjs/common';
import { SalaryService } from './salary.service';

@Controller('salary')
export class SalaryController {

    constructor(
        private readonly salaryService: SalaryService
    ) { }

    @Get('/')
    async getSalary(
        @Query('jobID') jobID: string,
        @Query('entityID') entityID: string,
        @Query('entityType') entityType: string
    ) {
        return entityType === 'country' ?
            await this.salaryService.findJobSalaryFromCountry(jobID, entityID) :
            await this.salaryService.findJobSalaryFromCity(jobID, entityID);
    }
}
