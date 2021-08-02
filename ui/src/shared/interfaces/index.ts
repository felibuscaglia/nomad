import * as H from "history";

export interface City {
    id: number;
    name: string;
    image: string;
    country: Country;
    rank: number;
    voteCount: number;
    description: string;
    pillars: CityPillars[];
}

export interface CityPillars {
  pillar: Pillar;
  score: number;
  voteCount: number;
}

export interface Pillar {
  id: number;
  name: string;
}
export interface Country {
    id: number;
    name: string;
    image: string | null;
    independent: boolean;
    unMember: boolean;
    currency: string;
    capital: string;
    region: string;
    subregion: string;
    languages: string;
    landlocked: boolean;
    area: number;
    emojiFlag: string;
    description: string;
}

export interface ReduxState {
    jobs: Job[]
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

export interface Job {
  id: number;
  title: string;
}