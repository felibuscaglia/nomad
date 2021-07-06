import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './models/city.model';
import axios from 'axios';
import { Country } from 'src/countries/models/country.model';
import * as _ from 'lodash';

@Injectable()
export class CitiesService {
    constructor(
        @InjectRepository(City)
        private cityRepository: Repository<City>
    ) { }

    async saveCity(name: string, country: Country) {
        const newCity: City = {
            name,
            image: await this.getCityImage(name),
            country
        }
        return this.cityRepository.save(newCity);
    }

    async getCityImage(query: string) {
        const unsplashApiUrl = process.env.UNSPLASH_API_URL;
        const unsplashApiKey = process.env.UNSPLASH_ACCESS_KEY;
        try {
            const unsplashDTO = await axios.get(`${unsplashApiUrl}/search/photos?query=${query}&client_id=${unsplashApiKey}`);
            const unsplashResponse = unsplashDTO.data;
            if (!unsplashResponse?.total) return null;
            else return unsplashResponse?.results[0]?.urls?.regular || null;
        } catch (err) {
            return null;
        }
    }

    async getRandomCity() {
        return this.cityRepository.createQueryBuilder('city')
            .leftJoinAndSelect('city.country', 'country')
            .orderBy('RANDOM()')
            .limit(1)
            .getOne();
    }
}
