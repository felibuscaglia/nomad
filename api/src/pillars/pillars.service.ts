import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pillar } from './models/pillar.model';

@Injectable()
export class PillarsService {
    constructor(
        @InjectRepository(Pillar)
        private readonly pillarsRepository: Repository<Pillar>,
    ) { }

    async createPillar(name: string) {
        let pillar = await this.pillarsRepository.findOne({ where: { name } });
        if (!pillar) pillar = await this.pillarsRepository.save({ name });
        return pillar;
    }

    getAllPillars() {
        return this.pillarsRepository.find();
    }

    findByName = (name: string) => this.pillarsRepository.findOne({ where: { name } })
}
