import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ad } from './models/ad.model';

@Injectable()
export class AdsService {
    constructor(
        @InjectRepository(Ad)
        private adsRepository: Repository<Ad>
    ) { }

    getAds(page: number) {
        return this.adsRepository
            .createQueryBuilder('ads')
            .limit(page)
            .getMany();
    }
}
