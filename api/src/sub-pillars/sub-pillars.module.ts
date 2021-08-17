import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PillarsModule } from '../pillars/pillars.module';
import { CommonModule } from '../common/common.module';
import { SubPillar } from './models/sub-pillars.model';
import { SubPillarsService } from './sub-pillars.service';
import { SubPillarsController } from './sub-pillars.controller';
import { CityPillarsModule } from '../city-pillars/city-pillars.module';

@Module({
    imports: [TypeOrmModule.forFeature([SubPillar]), CommonModule, PillarsModule, CityPillarsModule],
    providers: [SubPillarsService],
    controllers: [SubPillarsController]
})
export class SubPillarsModule { }
