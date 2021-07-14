export interface City {
    id: number;
    name: string;
    image: string;
    country: Country;
    rank: number;
    voteCount: number;
}

export interface Country {
    id: number;
    name: string;
    image: string | null;
}

export interface ReduxState {
    cities: City[]
}

export interface Ad {
    id: number;
    companyName?: string;
    description?: string;
    image?: string;
    local: boolean;
}