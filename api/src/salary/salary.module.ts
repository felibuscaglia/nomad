import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobModule } from '../job/job.module';
import { CitySalary, CountrySalary } from './models/salary.model';
import { SalaryFactory } from './salary.factory';
import { SalaryService } from './salary.service';
import { SalaryController } from './salary.controller';

@Module({
  providers: [SalaryService, SalaryFactory],
  exports: [SalaryService, SalaryFactory],
  imports: [JobModule, TypeOrmModule.forFeature([CountrySalary, CitySalary])],
  controllers: [SalaryController]
})
export class SalaryModule {}
