import { NestFactory } from '@nestjs/core';
import { CountriesService } from 'src/countries/countries.service';
import { AppModule } from '../app.module';


async function runAsync(countryName: string) {
  const app = await NestFactory.create(AppModule);
  const countriesService = app.get(CountriesService);

  await countriesService.saveCity(countryName);

  process.exit();
}

runAsync('Netherlands');