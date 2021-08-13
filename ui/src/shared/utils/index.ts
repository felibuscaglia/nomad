import { City } from "../interfaces";

export function getCityRating(city: City) {
    const ranking = (city?.rank / 2) / city?.voteCount;
    return isNaN(ranking) ? 0 : ranking;
}

export function getCityRatingForPage(city: City) {
    const ranking = city?.rank / city?.voteCount;
    return isNaN(ranking) ? 'N/A' : ranking;
}

export function getPillarIcon(pillarName: string) {
    const icons: { [key: string]: string } = {
        'Housing': '🏡',
        'Cost of Living': '💸',
        'Startups': '🚀',
        'Venture Capital': '🤝',
        'Travel Connectivity': '🛬',
        'Commute': '🚌',
        'Business Freedom': '😃',
        'Safety': '👮',
        'Healthcare': '🏥',
        'Education': '📚',
        'Environmental Quality': '🏞️',
        'Economy': '💵',
        'Taxation': '💰',
        'Internet Access': '📡',
        'Leisure & Culture': '🎭',
        'Tolerance': '🫂',
        'Outdoors': '⛲',
        'Job Market': '📈',
    }
    return icons[pillarName];
}
