import { Injectable } from "@nestjs/common";
import { Country } from "src/countries/models/country.model";
import { JobService } from "../job/job.service";
import { JobData } from "../countries/interfaces";
import { CountrySalary } from "./models/country-salary.model";

@Injectable()

export class CountrySalaryFactory {

    constructor(
        private readonly jobService: JobService
    ) { }

    buildCountrySalary = async (jobData: JobData, country: Country): Promise<CountrySalary> => {
        return {
            salary: Math.round(jobData.salary_percentiles.percentile_50),
            country,
            job: await this.findOrCreateJob(jobData.job.title)
        };
    }

    async findOrCreateJob(title: string) {
        const checkIfExists = await this.jobService.findJob(title);
        return checkIfExists ?? await this.jobService.createJob({ title });
    }

}