export interface RestCountriesDTO {
    name: {
        common: string;
    }
    independent: boolean;
    unMember: boolean;
    currencies: { [key: string]: Currency };
    capital: string[];
    region: string;
    subregion: string;
    languages: { [key: string]: string };
    landlocked: boolean;
    area: number;
    flag: string;
}

interface Currency {
    name: string;
    symbol: string;
}