import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PillarsModule } from '../pillars/pillars.module';
import { CommonModule } from '../common/common.module';
import { SubPillar } from './models/sub-pillars.model';
import { SubPillarsService } from './sub-pillars.service';
import { SubPillarsController } from './sub-pillars.controller';

@Module({
    imports: [TypeOrmModule.forFeature([SubPillar]), CommonModule, PillarsModule],
    providers: [SubPillarsService],
    controllers: [SubPillarsController]
})
export class SubPillarsModule { }
