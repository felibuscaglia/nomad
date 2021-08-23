import { CityImage } from '../../city-images/models/city-image.model';

export interface QueryResult {
    id: number;
    name: string;
    image: CityImage | string;
}