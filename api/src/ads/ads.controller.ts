import { Controller, Get } from '@nestjs/common';
import { AdsService } from './ads.service';

@Controller('ads')
export class AdsController {
    constructor(
        private readonly adsService: AdsService
    ) { }

    @Get('/')
    async getAdsForCityPage() {
        let ads = await this.adsService.getAds(3);
        while (ads.length < 3) ads = ads.concat(ads[0]);
        return ads;
    }
}
