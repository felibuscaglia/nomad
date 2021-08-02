import { NestFactory } from '@nestjs/core';
import { CountriesService } from '../countries/countries.service';
import { AppModule } from '../app.module';
import { SalaryCountryService } from '../salary-country/salary-country.service';


async function runAsync() {
    const app = await NestFactory.create(AppModule);
    const countrySalaryService = app.get(SalaryCountryService);
    const countryService = app.get(CountriesService);

    const allCountries = await countryService.getAllCountries();

    for (const country of allCountries) {
        await countryService.getCountrySalary(country);
    }

    process.exit();
}


runAsync();