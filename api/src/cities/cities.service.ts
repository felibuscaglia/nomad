import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './models/city.model';
import axios from 'axios';
import { Country } from 'src/countries/models/country.model';
import * as _ from 'lodash';
import { CountriesService } from 'src/countries/countries.service';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class CitiesService {
    constructor(
        @InjectRepository(City)
        private cityRepository: Repository<City>,
        private readonly countriesService: CountriesService,
        private readonly commonService: CommonService
    ) { }

    async saveCity(name: string, country: Country) {
        const newCity: City = {
            name,
            image: await this.commonService.getImages(name, true),
            country
        }
        console.log(`Saving new city: ${name}`);
        return this.cityRepository.save(newCity);
    }

    async getRandomCity() {
        return this.cityRepository.createQueryBuilder('city')
            .leftJoinAndSelect('city.country', 'country')
            .where('city.image is not null')
            .orderBy('RANDOM()')
            .limit(1)
            .getOne();
    }

    async getCitiesFromAPI(limit: number) {
        let allCities = [];
        const allCountries = await this.countriesService.getAllCountries();
        for (const country of allCountries) {
            const citiesFromCountry = await this.getCitiesFromCountryAPI(country);
            allCities = allCities.concat(citiesFromCountry);
            if (allCities.length >= limit) break;
        }
        for (const city of allCities) {
            await this.saveCity(city.name, city.country);
        }
    }

    async getCitiesFromCountryAPI(country: Country) {
        const citiesFromCountry = [];
        try {
            const teleportDTO = await axios.get(`${process.env.TELEPORT_API_URL}/api/cities/?search=${country.name}&embed=city%3Asearch-results%2Fcity%3Aitem%2Fcity`);
            teleportDTO?.data?._embedded['city:search-results'].forEach(result => {
                const newCity = result?._embedded ? { name: result?._embedded['city:item'].name, country } : null;
                if (newCity) citiesFromCountry.push(newCity);
            });
        } catch (err) {
            return [];
        }
        return citiesFromCountry;
    }
}
