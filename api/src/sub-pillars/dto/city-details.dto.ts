export interface CityDetailsDTO {
    categories: CityDetailsCategory[];
}

export interface CityDetailsCategory {
    data: SubPillarDTO[];
    id: string;
    label: string
}

export interface SubPillarDTO {
    id: string;
    label: string;
    type: string;
    float_value?: number;
    string_value?: string;
    currency_dolar_value?: number;
    int_value?: number;
    percent_value?: number;
}