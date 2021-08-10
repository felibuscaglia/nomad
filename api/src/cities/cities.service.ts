import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './models/city.model';
import axios from 'axios';
import { Country } from 'src/countries/models/country.model';
import { CommonService } from 'src/common/common.service';
import { AdsService } from 'src/ads/ads.service';
import { Ad } from 'src/ads/models/ad.model';
import { PillarsService } from 'src/pillars/pillars.service';
import { CityPillarsService } from 'src/city-pillars/city-pillars.service';
import { CountriesService } from '../countries/countries.service';
import { CityScoresDTO, TeleportCityDTO, UrbanAreasDTO } from './dto/teleport.dto';
import { CityImagesService } from '../city-images/city-images.service';
import { CityImage } from '../city-images/models/city-image.model';
import { TeleportSalariesDTO } from '../countries/interfaces';
import { SalaryService } from '../salary/salary.service';

@Injectable()
export class CitiesService {
    constructor(
        @InjectRepository(City)
        private cityRepository: Repository<City>,
        private readonly countriesService: CountriesService,
        private readonly commonService: CommonService,
        private readonly adsService: AdsService,
        private readonly pillarsService: PillarsService,
        private readonly cityPillarsService: CityPillarsService,
        private readonly cityImagesService: CityImagesService,
        private readonly salaryService: SalaryService
    ) { }

    async saveCity(name: string, country: Country, image: CityImage) {
        const newCity: City = {
            name,
            country,
            rank: 0,
            voteCount: 0,
            description: await this.commonService.getWikipediaDescription(name),
            image
        }
        console.log(`Saving new city: ${name}`);
        return this.cityRepository.save(newCity);
    }

    syncCities = async () => {
        try {
            const teleportDTO = await axios.get<TeleportCityDTO>(`${process.env.TELEPORT_API_URL}/api/urban_areas/`);
            for (const cityDetails of teleportDTO.data._links['ua:item']) {
                const mainCityDTO = await axios.get<UrbanAreasDTO>(cityDetails.href);
                const cityCountry = await this.countriesService.findCountryByName(mainCityDTO.data._links['ua:countries'][0].name);
                const cityImage = await this.cityImagesService.saveCityImage(mainCityDTO.data._links['ua:images'].href);
                const newCity = await this.saveCity(mainCityDTO.data.name, cityCountry, cityImage);
                await this.getCityScores(newCity, mainCityDTO.data._links['ua:scores'].href);
            }
        } catch (err) {
            console.error(err);
        }
    }

    async getCitiesWithAds(page: number): Promise<(City | Ad)[]> {
        const paginationStart = (page - 1) * 8;
        const paginationEnd = page * 8;
        const cities = await this.cityRepository.createQueryBuilder('city')
            .leftJoinAndSelect('city.country', 'country')
            .leftJoinAndSelect('city.image', 'image')
            .orderBy('city.rank', 'DESC')
            .limit(paginationEnd)
            .getMany();
        const slicedCities = cities.slice(paginationStart, paginationEnd);
        const ads = await this.adsService.getAds(page);
        const noMoreAds = ads.length < page;

        return noMoreAds ? slicedCities : this.commonService.insertInArray(slicedCities, 2, ads[ads.length - 1]);
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
            .leftJoinAndSelect('city.image', 'image')
            .leftJoinAndSelect('city.pillars', 'cityPillars')
            .leftJoinAndSelect('cityPillars.pillar', 'pillar')
            .where('cityPillars.city.id = :id', { id })
            .getOne();
    }

    async getCityScores(city: City, href: string) {
        try {
            const cityScoresDTO = await axios.get<CityScoresDTO>(href);
            for (const category of cityScoresDTO.data.categories) {
                const pillar = await this.pillarsService.createPillar(category.name);
                await this.cityPillarsService.createRelation(city, pillar, category.score_out_of_10);
                await this.updateCity({
                    ...city,
                    rank: Math.round(cityScoresDTO?.data?.teleport_city_score / 10) ?? 0,
                    voteCount: 1
                })
            }
        } catch (err) {
            console.error(err);
        }
    }

    syncCitySalaries = async (city: City) => {
        const encodedName = this.commonService.encodeNameForTeleport(city.name);
        try {
            const salaryDTO = await axios.get<TeleportSalariesDTO>(`${process.env.TELEPORT_API_URL}/api/urban_areas/slug:${encodedName}/salaries/`);
            if (salaryDTO) {
                for (const jobData of salaryDTO?.data?.salaries) {
                    await this.salaryService.saveCitySalary(jobData, city);
                }
            }
        } catch (err) {
            console.error(err.response.data);
        }
    }
}
