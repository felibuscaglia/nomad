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
    cca2: string;
}

interface Currency {
    name: string;
    symbol: string;
}

export interface TeleportSalariesDTO {
    salaries: JobData[];
}

export interface JobData {
    job: {
        id: string;
        title: string;
    }
    salary_percentiles: {
        percentile_25: number;
        percentile_50: number;
        percentile_75: number;
    }
}