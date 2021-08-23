import * as H from "history";

export interface City {
  id: number;
  name: string;
  image: Photo;
  country: Country;
  rank: number;
  description: string;
  latitude: number;
  longitude: number;
  pillars: CityPillars[];
}

export interface CityPillars {
  pillar: Pillar;
  score: number;
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
  population: number;
  cities?: City[];
  uaAdvise?: string;
  caAdvise?: string;
  weather?: CountryWeather[];
  neighbors?: Country[];
}

interface Photo {
  id: number;
  photographer: string;
  site: string;
  image: string;
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

export interface Salary {
  salary: number;
}

export interface SubPillar {
  id: number;
  name: string;
  value: string;
  type: string;
}

export interface QueryResults {
  id: number;
  name: string;
  image: Photo | string;
}

export interface CountryWeather {
  id: number;
  month: string;
  tAvg: number;
  pAvg: number;
}