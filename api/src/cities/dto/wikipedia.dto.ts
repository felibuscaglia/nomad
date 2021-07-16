export interface WikipediaDTO {
    batchcomplete: string;
    query: Query;
}

export interface Query {
    pages: Pages;
}

export interface Pages {
    [key: string]: {
        pageid?: number;
        ns: number;
        title: string;
        extract?: string;
        missing?: string;
    }
}