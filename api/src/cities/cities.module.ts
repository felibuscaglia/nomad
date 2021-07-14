import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './models/city.model';
import { CommonModule } from 'src/common/common.module';
import { CountriesModule } from 'src/countries/countries.module';
import { AdsModule } from 'src/ads/ads.module';

@Module({
  imports: [TypeOrmModule.forFeature([City]), CommonModule, CountriesModule, AdsModule],
  providers: [CitiesService],
  controllers: [CitiesController],
  exports: [CitiesService]
})
export class CitiesModule {}
