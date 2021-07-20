export interface TeleportDTO {
    _links: Links;
    categories: Category[];
    summary: string;
    teleport_city_score: number;
}

interface Links {
    curies: Cury[];
    self: {
        href: string;
    }
}

interface Cury {
    href: string;
    name: string;
    templated: boolean;
}

export interface Category {
    color: string;
    name: string;
    score_out_of_10: number;
}