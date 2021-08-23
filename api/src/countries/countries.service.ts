import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { CommonService } from '../common/common.service';
import { getConnection, Repository } from 'typeorm';
import { RestCountriesDTO, TeleportSalariesDTO, TravelBriefingDTO } from './interfaces';
import { Country } from './models/country.model';
import { CountryFactory } from './country.factory';
import { SalaryService } from '../salary/salary.service';
import { CountryWeatherService } from '../country-weather/country-weather.service';

@Injectable()
export class CountriesService {
    constructor(
        @InjectRepository(Country)
        private countryRepository: Repository<Country>,
        private readonly commonService: CommonService,
        private readonly countryFactory: CountryFactory,
        private readonly salaryService: SalaryService,
        private readonly weatherService: CountryWeatherService
    ) { }

    saveCountry(country: Country) {
        console.log(`Saving new country: ${country.name}`);
        return this.countryRepository.save(country);
    }

    findCountryByName(name: string) {
        return this.countryRepository.findOne({ where: { name } });
    }

    async getAllCountriesFromAPI() {
        try {
            const teleportApiDTO = await axios.get<RestCountriesDTO[]>('https://restcountries.com/v3/all');
            for (const country of teleportApiDTO.data) {
                const checkIfExists = await this.findCountryByName(country.name.common);
                if (!checkIfExists) {
                    const countryImage = await this.commonService.getImages(country.name.common, false);
                    const countryDescription = await this.commonService.getWikipediaDescription(country.name.common);
                    const countryPopulation = await this.getCountryPopulation(country.cca2);
                    const countryToInsert = this.countryFactory.buildCountry(country, typeof countryImage === 'string' && countryImage, countryDescription, countryPopulation);
                    await this.saveCountry(countryToInsert);
                }
            }
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

    getCountryById = async (id: number) => this.countryRepository.findOne({ where: { id }, relations: ['jobs', 'cities', 'cities.image', 'weather', 'neighbors'] });

    async getCountrySalary(country: Country) {
        try {
            const countrySalaryDTO = await axios.get<TeleportSalariesDTO>(`https://api.teleport.org/api/countries/iso_alpha2:${country.isoCode}/salaries/`);
            if (countrySalaryDTO) {
                for (const jobData of countrySalaryDTO?.data?.salaries) {
                    await this.salaryService.saveCountrySalary(jobData, country);
                }
            }
        } catch (err) {
            console.error(err);
        }
    }

    getCountryPopulation = async (isoCode: string) => {
        try {
            const countryDTO = await axios.get<{ population: number }>(`https://api.teleport.org/api/countries/iso_alpha2:${isoCode}/`);
            return countryDTO.data.population;
        } catch (err) {
            console.error(err);
        }
    }

    queryCountries = async (query: string) => {
        return await this.countryRepository.createQueryBuilder('country')
            .where("LOWER(country.name) LIKE :name", { name: `%${query.toLowerCase()}%` })
            .getMany();
    }

    syncTravelBriefingData = async (country: Country) => {
        try {
            const travelBriefingDTO = await axios.get<TravelBriefingDTO>(`https://travelbriefing.org/${encodeURI(country.name)}?format=json`);
            const weatherData = travelBriefingDTO.data.weather;
            for (const month of Object.keys(weatherData)) {
                await this.weatherService.buildAndSaveCountryWeatherService(month, country, weatherData[month]);
            }
            const neighbors: Country[] = [];
            for (const neighbor of travelBriefingDTO.data.neighbors) {
                const neighborCountry = await this.findCountryByName(neighbor.name)
                if (neighborCountry) neighbors.push(neighborCountry);
            } 
            await this.saveCountry({ 
                ...country,
                uaAdvise: travelBriefingDTO.data.advise?.UA?.advise ?? null,
                caAdvise: travelBriefingDTO.data.advise?.CA?.advise.replace(/<\!--.*?-->/g, "") ?? null,
                neighbors
            });
        } catch (err) {
            console.error(err);
        }
    }
}
