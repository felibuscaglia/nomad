import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { SubPillarsService } from './sub-pillars.service';

@Controller('sub-pillars')
export class SubPillarsController {

    constructor(
        private readonly subPillarsService: SubPillarsService
    ) { }

    @Get('/:cityId/:pillarId')
    async getCitySubPillar(
        @Param('cityId', ParseIntPipe) cityId: number,
        @Param('pillarId', ParseIntPipe) pillarId: number
    ) {
        return await this.subPillarsService.findSubPillarFromCity(cityId, pillarId);
    }
}
