import { City } from "../interfaces";

export function getCityRating(city: City) {
    const ranking = (city?.rank / 2) / city?.voteCount;
    return isNaN(ranking) ? 0 : ranking;
}

export function getCityRatingForPage(city: City) {
    const ranking = city?.rank / city?.voteCount;
    return isNaN(ranking) ? 'N/A' : ranking;
}