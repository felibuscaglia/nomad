import { City } from "../interfaces";
import * as _ from 'lodash';

export function getCityRating(city: City) {
    const ranking = city?.rank / city?.voteCount;
    return _.isNaN(ranking) ? 0 : ranking;
}

export function getCityRatingForPage(city: City) {
    const ranking = city?.rank / city?.voteCount;
    return _.isNaN(ranking) ? 'N/A' : ranking;
}