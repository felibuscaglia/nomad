import { Module } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from './models/country.model';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [TypeOrmModule.forFeature([Country]), CommonModule],
  providers: [CountriesService],
  controllers: [CountriesController],
  exports: [CountriesService]
})
export class CountriesModule { }
