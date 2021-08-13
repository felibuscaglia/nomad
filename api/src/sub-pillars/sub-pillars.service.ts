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

@Injectable()
export class SubPillarsService {
    constructor(
        private readonly commonService: CommonService,
        @InjectRepository(SubPillar)
        private readonly subPillarsRepository: Repository<SubPillar>,
        private readonly pillarsService: PillarsService
    ) { }

    getCityDetails = async (city: City) => {
        const encodedName = this.commonService.encodeNameForTeleport(city.name);
        console.log(`Syncing details for ${city.name}`)
        try {
            const detailsDTO = await axios.get<CityDetailsDTO>(`${process.env.TELEPORT_API_URL}/api/urban_areas/slug:${encodedName}/details`);
            for (const category of detailsDTO.data.categories) {
                if (category.label !== 'City Size' && category.label !== 'Climate') {
                    for (const subPillar of category.data) {
                        const value = `${subPillar.type}_value`;
                        const pillar = await this.pillarsService.findByName(category.label);
                        subPillar.type !== 'url' && await this.buildAndSave(subPillar, subPillar[value], pillar, city);
                    }
                }
            }
        } catch (err) {
            console.error(err);
        }
    }

    buildAndSave = async (subPillarDTO: SubPillarDTO, value: string | number, pillar: Pillar, city: City) => {
        const newSubPillar: SubPillar = {
            name: subPillarDTO.label,
            value: String(value),
            type: subPillarDTO.type,
            pillar,
            city
        }
        await this.subPillarsRepository.save(newSubPillar);
    }

    findSubPillarFromCity = (cityId: number, pillarId: number) => {
        return this.subPillarsRepository.createQueryBuilder('subPillar')
            .where('subPillar.city = :cityId', { cityId })
            .andWhere('subPillar.pillar = :pillarId', { pillarId })
            .getMany();
    }
}
