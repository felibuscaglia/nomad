import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { CommonService } from 'src/common/common.service';
import { getConnection, Repository } from 'typeorm';
import { Country } from './models/country.model';

@Injectable()
export class CountriesService {
    constructor(
        @InjectRepository(Country)
        private countryRepository: Repository<Country>,
        private readonly commonService: CommonService
    ) { }

    saveCountry(name: string) {
        return this.countryRepository.insert({ name });
    }

    findCountry(name: string) {
        return this.countryRepository.findOne({ where: { name } });
    }

    async getAllCountriesFromAPI() {
        const apiURL = process.env.TELEPORT_API_URL;
        try {
            const teleportApiDTO = await axios.get(`${apiURL}/api/countries/`);
            const allCountries = teleportApiDTO?.data?._links['country:items'];
            const mappedCountries: Country[] = [];
            for (const country of allCountries) {
                const name = country.name;
                const countryImage = await this.commonService.getImages(country.name, false);
                mappedCountries.push({ name, image: countryImage });
            }
            return await this.insertMultipleCountries(mappedCountries);
        } catch (err) {
            console.error(err);
        }
    }

    async insertMultipleCountries(countries: Country[]) {
        const insertedCountries = await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Country)
            .values(countries)
            .returning('*')
            .execute();
        return insertedCountries.generatedMaps;
    }

    getAllCountries() {
        return this.countryRepository.find();
    }

    getRandomCountries() {
        return this.countryRepository.createQueryBuilder('country')
            .where('country.image is not null')
            .orderBy('RANDOM()')
            .limit(11)
            .getMany();
    }
}
