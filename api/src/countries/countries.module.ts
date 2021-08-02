import { Module } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from './models/country.model';
import { CommonModule } from 'src/common/common.module';
import { CountryFactory } from './country.factory';
import { SalaryCountryModule } from '../salary-country/salary-country.module';

@Module({
  imports: [TypeOrmModule.forFeature([Country]), CommonModule, SalaryCountryModule],
  providers: [CountriesService, CountryFactory],
  controllers: [CountriesController],
  exports: [CountriesService, CountryFactory]
})
export class CountriesModule { }
