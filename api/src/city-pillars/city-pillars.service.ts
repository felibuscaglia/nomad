import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from 'src/cities/models/city.model';
import { Pillar } from 'src/pillars/models/pillar.model';
import { Repository } from 'typeorm';
import { CityPillars } from './models/city-pillars.model';

@Injectable()
export class CityPillarsService {
    constructor(
        @InjectRepository(CityPillars)
        private readonly cityPillarsRepository: Repository<CityPillars>
    ) { }
    async createRelation(city: City, pillar: Pillar, score: number) {
        if (!city) return;

        const newRelation: CityPillars = {
            score: Math.round(score),
            city,
            pillar
        };
        return await this.cityPillarsRepository.save(newRelation);
    }
}
