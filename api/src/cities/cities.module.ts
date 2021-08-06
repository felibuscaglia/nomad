import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './models/city.model';
import { CommonModule } from 'src/common/common.module';
import { CountriesModule } from 'src/countries/countries.module';
import { AdsModule } from 'src/ads/ads.module';
import { PillarsModule } from 'src/pillars/pillars.module';
import { CityPillarsModule } from 'src/city-pillars/city-pillars.module';
import { CityImagesModule } from 'src/city-images/city-images.module';
import { SalaryModule } from '../salary/salary.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([City]),
    CommonModule,
    CountriesModule,
    AdsModule,
    PillarsModule,
    CityPillarsModule,
    CityImagesModule,
    SalaryModule
  ],
  providers: [CitiesService],
  controllers: [CitiesController],
  exports: [CitiesService]
})
export class CitiesModule { }
