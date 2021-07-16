import { City } from "../interfaces";

export function getCityRating(city: City) {
    return city?.rank / city?.voteCount;
}