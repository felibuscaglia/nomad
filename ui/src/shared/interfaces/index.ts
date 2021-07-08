export interface City {
    id: number;
    name: string;
    image: string;
    country: Country;
}

export interface Country {
    id: number;
    name: string;
    image: string | null;
}

export interface ReduxState {
    cities: City[]
}