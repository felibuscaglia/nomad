import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PillarsModule } from '../pillars/pillars.module';
import { CommonModule } from '../common/common.module';
import { SubPillar } from './models/sub-pillars.model';
import { SubPillarsService } from './sub-pillars.service';
import { CitiesModule } from '../cities/cities.module';

@Module({
    imports: [TypeOrmModule.forFeature([SubPillar]), CommonModule, PillarsModule, CitiesModule],
    providers: [SubPillarsService]
})
export class SubPillarsModule { }
