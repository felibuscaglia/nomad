import { Controller, Get } from '@nestjs/common';
import { JobService } from './job.service';

@Controller('job')
export class JobController {

    constructor (
        private readonly jobsService: JobService
    ) { }

    @Get('/')
    async getAllJobs () {
       const jobs =  await this.jobsService.findAllJobs();
       return jobs;
    }
}
