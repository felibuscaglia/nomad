import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './models/city.model';
import axios from 'axios';
import { Country } from 'src/countries/models/country.model';
import * as _ from 'lodash';
import { CountriesService } from 'src/countries/countries.service';
import { CommonService } from 'src/common/common.service';
import { AdsService } from 'src/ads/ads.service';
import { Ad } from 'src/ads/models/ad.model';
import { Query, WikipediaDTO } from './dto/wikipedia.dto';
import { TeleportDTO } from './dto/teleport.dto';
import { PillarsService } from 'src/pillars/pillars.service';
import { CityPillarsService } from 'src/city-pillars/city-pillars.service';

@Injectable()
export class CitiesService {
    constructor(
        @InjectRepository(City)
        private cityRepository: Repository<City>,
        private readonly countriesService: CountriesService,
        private readonly commonService: CommonService,
        private readonly adsService: AdsService,
        private readonly pillarsService: PillarsService,
        private readonly cityPillarsService: CityPillarsService
    ) { }

    async saveCity(name: string, country: Country) {
        const newCity: City = {
            name,
            image: await this.commonService.getImages(name),
            country,
            rank: 0,
            voteCount: 0,
            description: await this.getCityDescriptions(name)
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
        const allPillars = await this.pillarsService.getAllPillars();
        for (const country of allCountries) {
            const citiesFromCountry = await this.getCitiesFromCountryAPI(country);
            allCities = allCities.concat(citiesFromCountry);
            if (allCities.length >= limit) break;
        }
        for (const city of allCities) {
            const newCity = await this.saveCity(city.name, city.country);
            for (const pillar of allPillars) {
                await this.cityPillarsService.createRelation(newCity, pillar, 0);
            }
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

    async getCitiesWithAds(page: number): Promise<(City | Ad)[]> {
        const paginationStart = (page - 1) * 8;
        const paginationEnd = page * 8;
        const cities = await this.cityRepository.createQueryBuilder('city')
            .leftJoinAndSelect('city.country', 'country')
            .orderBy('city.rank', 'DESC')
            .limit(paginationEnd)
            .getMany();
        const slicedCities = cities.slice(paginationStart, paginationEnd);
        const ads = await this.adsService.getAds(page);
        const noMoreAds = ads.length < page;

        return noMoreAds ? slicedCities : this.commonService.insertInArray(slicedCities, 2, _.last(ads));
    }

    async getCityDescriptions(cityName: string) {
        try {
            const uriEncodedCityName = encodeURI(cityName);
            const wikipediaDTO = await axios.get<WikipediaDTO>(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&explaintext=1&exsentences=7&titles=${uriEncodedCityName}`);
            if (wikipediaDTO) {
                return this.getWikipediaDescriptionFromQuery(wikipediaDTO.data?.query);
            }
        } catch (err) {
            console.error(err);
        }
    }

    getWikipediaDescriptionFromQuery(query: Query) {
        if (!query) return null;

        const pages = query.pages;
        const keyPages = _.values(pages);
        return _.first(keyPages)?.extract ?? null;
    }

    getAllCities() {
        return this.cityRepository.find();
    }

    async updateCity(city: City) {
        await this.cityRepository.update(city.id, city);
    }

    getCity(id: number) {
        return this.cityRepository.createQueryBuilder('city')
            .leftJoinAndSelect('city.country', 'country')
            .leftJoinAndSelect('city.pillars', 'cityPillars')
            .leftJoinAndSelect('cityPillars.pillar', 'pillar')
            .where('cityPillars.city.id = :id', { id })
            .getOne();
    }

    async getCityScores(city: City, encodedName: string) {
        try {
            const teleportDTO = await axios.get<TeleportDTO>(`${process.env.TELEPORT_API_URL}/api/urban_areas/slug:${encodedName}/scores/`);
            if (teleportDTO) {
                for (const category of teleportDTO.data?.categories) {
                    const pillar = await this.pillarsService.createPillar(category.name);
                    await this.cityPillarsService.createRelation(city, pillar, category.score_out_of_10);
                }
            }
        } catch (err) {
            console.error(err);
        }
    }
}
