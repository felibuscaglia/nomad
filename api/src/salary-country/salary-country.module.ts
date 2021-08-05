import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobModule } from '../job/job.module';
import { CountrySalary } from './models/country-salary.model';
import { CountrySalaryFactory } from './salary-country.factory';
import { SalaryCountryService } from './salary-country.service';
import { SalaryCountryController } from './salary-country.controller';

@Module({
  providers: [SalaryCountryService, CountrySalaryFactory],
  exports: [SalaryCountryService, CountrySalaryFactory],
  imports: [JobModule, TypeOrmModule.forFeature([CountrySalary])],
  controllers: [SalaryCountryController]
})
export class SalaryCountryModule {}
