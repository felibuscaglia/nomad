import { Injectable } from "@nestjs/common";
import { RestCountriesDTO } from "./interfaces";
import { Country } from "./models/country.model";

@Injectable()

export class CountryFactory {

    buildCountry = (countryData: RestCountriesDTO, image: string, description: string): Country => {
        return {
            name: countryData.name.common,
            image,
            independent: countryData.independent ?? false,
            unMember: countryData.unMember,
            currency: countryData.currencies ? Object.values(countryData.currencies)[0]?.name : null,
            capital: countryData.capital[0] ?? null,
            region: countryData.region,
            subregion: countryData.subregion ?? null,
            languages: countryData.languages ? Object.values(countryData.languages).join(', ') : null,
            landlocked: countryData.landlocked,
            area: Math.round(countryData.area),
            emojiFlag: countryData.flag ?? null,
            description
        }
    }
}