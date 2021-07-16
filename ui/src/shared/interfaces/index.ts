import * as H from "history";

export interface City {
    id: number;
    name: string;
    image: string;
    country: Country;
    rank: number;
    voteCount: number;
    description: string;
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
export interface RouteComponentProps<P> {
  match: match<P>;
  location: H.Location;
  history: H.History;
  staticContext?: any;
}

export interface match<P> {
  params: P;
  isExact: boolean;
  path: string;
  url: string;
}