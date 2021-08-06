import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobData } from '../countries/interfaces';
import { Repository } from 'typeorm';
import { CitySalary, CountrySalary } from './models/salary.model';
import { SalaryFactory } from './salary.factory';
import { Country } from '../countries/models/country.model';
import { City } from '../cities/models/city.model';

@Injectable()
export class SalaryService {
    constructor(
        @InjectRepository(CountrySalary)
        private readonly countrySalaryRepository: Repository<CountrySalary>,
        private readonly countrySalaryFactory: SalaryFactory,
        @InjectRepository(CitySalary)
        private readonly citySalaryRepository: Repository<CitySalary>
    ) { }

    async saveCountrySalary(jobData: JobData, country: Country) {
        const newCountrySalary = await this.countrySalaryFactory.buildCountrySalary(jobData, country);
        return this.countrySalaryRepository.save(newCountrySalary);
    }

    async findJobSalaryFromCountry(jobID: string, countryID: string) {
        return this.countrySalaryRepository.createQueryBuilder('countrySalary')
            .leftJoin('countrySalary.job', 'job')
            .leftJoin('countrySalary.country', 'country')
            .where('job.id = :jobID', { jobID })
            .andWhere('country.id = :countryID', { countryID })
            .getOne();
    }

    findJobSalaryFromCity = (jobID: string, cityID: string) => {
        return this.citySalaryRepository.createQueryBuilder('citySalary')
            .leftJoin('citySalary.job', 'job')
            .leftJoin('citySalary.city', 'city')
            .where('job.id = :jobID', { jobID })
            .andWhere('city.id = :cityID', { cityID })
            .getOne();
    }

    saveCitySalary = async (jobData: JobData, city: City) => {
        const newCitySalary = await this.countrySalaryFactory.buildCitySalary(jobData, city);
        return this.citySalaryRepository.save(newCitySalary);
    }

}
