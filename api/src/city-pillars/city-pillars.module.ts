import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityPillarsService } from './city-pillars.service';
import { CityPillars } from './models/city-pillars.model';

@Module({
  providers: [CityPillarsService],
  imports: [TypeOrmModule.forFeature([CityPillars])],
  exports: [CityPillarsService]
})
export class CityPillarsModule {}
