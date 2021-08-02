import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobData } from '../countries/interfaces';
import { Repository } from 'typeorm';
import { CountrySalary } from './models/country-salary.model';
import { CountrySalaryFactory } from './salary-country.factory';
import { Country } from '../countries/models/country.model';

@Injectable()
export class SalaryCountryService {
    constructor(
        @InjectRepository(CountrySalary)
        private readonly countrySalaryRepository: Repository<CountrySalary>,
        private readonly countrySalaryFactory: CountrySalaryFactory
    ) { }

    async saveCountrySalary(jobData: JobData, country: Country) {
        const newCountrySalary: CountrySalary = await this.countrySalaryFactory.buildCountrySalary(jobData, country);
        return this.countrySalaryRepository.save(newCountrySalary);
    }

}
