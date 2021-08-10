import { Injectable } from '@nestjs/common';
import { City } from '../cities/models/city.model';
import axios from 'axios';
import { CommonService } from '../common/common.service';
import { CityDetailsDTO, SubPillarDTO } from './dto/city-details.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SubPillar } from './models/sub-pillars.model';
import { Repository } from 'typeorm';
import { Pillar } from '../pillars/models/pillar.model';
import { PillarsService } from '../pillars/pillars.service';
import { CitiesService } from '../cities/cities.service';
const prompt = require('prompt');

@Injectable()
export class SubPillarsService {
    constructor(
        private readonly commonService: CommonService,
        @InjectRepository(SubPillar)
        private readonly subPillarsRepository: Repository<SubPillar>,
        private readonly pillarsService: PillarsService,
        private readonly citiesService: CitiesService
    ) { }

    getCityDetails = async (city: City) => {
        const cache = {};
        const encodedName = this.commonService.encodeNameForTeleport(city.name);
        console.log(`Syncing details for ${city.name}`)
        try {
            const detailsDTO = await axios.get<CityDetailsDTO>(`${process.env.TELEPORT_API_URL}/api/urban_areas/slug:${encodedName}/details`);
            for (const category of detailsDTO.data.categories) {
                let pillar = await this.pillarsService.findByName(category.label);
                if (!pillar) pillar = await this.pillarsService.createPillar(category.label);
                for (const subCategory of category.data) {
                    let selectedAction: string;
                    // TODO: Cache is not working.
                    if (!cache[subCategory.label]) {
                        console.log(`Action for: ${subCategory.label}`);
                        const { action } = await prompt.get(['action']);
                        cache[subCategory.label] = action;
                        selectedAction = action;
                    } else {
                        selectedAction = cache[subCategory.label];
                    }

                    await this.handleAction(selectedAction, subCategory, pillar, city);
                }
            }
        } catch (err) {
            console.error(err);
        }
    }

    buildAndSave = async (subPillarDTO: SubPillarDTO, value: string | number, pillar: Pillar, city: City) => {
        const newSubPillar: SubPillar = {
            name:
                subPillarDTO.label.includes('[Teleport score]') ?
                    subPillarDTO.label.replace('[Teleport score]', '') :
                    subPillarDTO.label,
            value: String(value),
            type: subPillarDTO.type,
            pillar,
            city
        }
        await this.subPillarsRepository.save(newSubPillar);
    }

    handleAction = async (action: string, category: SubPillarDTO, pillar: Pillar | null, city: City) => {
        const value = `${category.type}_value`;
        switch (action) {
            case '1':
                console.log(`Saving ${category.label} for ${city.name}`);
                await this.buildAndSave(category, category[value], pillar, city);
                break;
            case '2':
                console.log('Ignored');
                break;
            case '3':
                await this.citiesService.updateCity({ ...city, population: category[value] * 1000000 });
                break;
            case '4':
                await this.citiesService.updateCity({ ...city, weatherAverageHigh: Number(category[value]) });
                break;
            case '5':
                await this.citiesService.updateCity({ ...city, weatherAverageLow: Number(category[value]) });
                break;
            case '6':
                await this.citiesService.updateCity({ ...city, avgDayLength: Number(category[value]) });
                break;
            case '7':
                await this.citiesService.updateCity({ ...city, weatherType: category[value] });
                break;
            case '8':
                await this.citiesService.updateCity({ ...city, rainyDaysPerYear: category[value] });
                break;
        }
    }
}
