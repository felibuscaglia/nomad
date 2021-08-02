import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Connection } from 'typeorm';
import { CitiesModule } from './cities/cities.module';
import { CountriesModule } from './countries/countries.module';
import { Country } from './countries/models/country.model';
import { City } from './cities/models/city.model';
import { CommonModule } from './common/common.module';
import { AdsModule } from './ads/ads.module';
import { PillarsModule } from './pillars/pillars.module';
import { CityPillarsModule } from './city-pillars/city-pillars.module';
import { JobModule } from './job/job.module';
import { SalaryCountryModule } from './salary-country/salary-country.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(),
    CitiesModule,
    CountriesModule,
    CommonModule,
    AdsModule,
    PillarsModule,
    CityPillarsModule,
    JobModule,
    SalaryCountryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) { }
}