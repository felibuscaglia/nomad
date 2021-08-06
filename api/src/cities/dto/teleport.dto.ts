export interface TeleportCityDTO {
    _links: {
        'ua:item': UALinks[]
    }
}

export interface UrbanAreasDTO {
    _links: {
        'ua:details': UALinks,
        'ua:images': UALinks,
        'ua:salaries': UALinks,
        'ua:scores': UALinks,
        'ua:countries': { href: string; name: string } []
    }
    name: string;
}

export interface UrbanAreaImagesDTO {
    photos: Photo[]
}

interface Photo {
    attribution: {
        photographer: string;
        site: string;
    }
    image: {
        web: string;
    }
}

interface UALinks {
    href: string
}


export interface CityScoresDTO {
    categories: Category[];
    teleport_city_score: number;
}

export interface Category {
    color: string;
    name: string;
    score_out_of_10: number;
}