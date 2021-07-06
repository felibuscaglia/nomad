import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from './models/country.model';

@Injectable()
export class CountriesService {
    constructor(
        @InjectRepository(Country)
        private countryRepository: Repository<Country>
    ) { }

    saveCity(name: string) {
        return this.countryRepository.insert({ name });
    }

    findCountry(name: string) {
        return this.countryRepository.findOne({ where: { name } });
    }
}
