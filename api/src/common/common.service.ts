import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Query, WikipediaDTO } from 'src/cities/dto/wikipedia.dto';

@Injectable()
export class CommonService {
    constructor() { }

    async getImages(query: string) {
        const unsplashApiUrl = process.env.UNSPLASH_API_URL;
        const unsplashApiKey = process.env.UNSPLASH_ACCESS_KEY;
        try {
            const unsplashDTO = await axios.get(`${unsplashApiUrl}/search/photos?query=${query}&client_id=${unsplashApiKey}`);
            const unsplashResponse = unsplashDTO.data;
            if (!unsplashResponse?.total) return null;
            else return unsplashResponse?.results[0]?.urls?.regular || null;
        } catch (err) {
            return null;
        }
    }

    insertInArray(arr: any[], index: number, newItem: any) {
        return [...arr.slice(0, index), newItem, ...arr.slice(index)];
    }

    async getWikipediaDescription(query: string) {
        try {
            const encodedQuery = encodeURI(query);
            const wikipediaDTO = await axios.get<WikipediaDTO>(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&explaintext=1&exsentences=7&titles=${encodedQuery}`);
            if (wikipediaDTO) {
                return this.getWikipediaDescriptionFromQuery(wikipediaDTO.data?.query);
            }
        } catch (err) {
            console.error(err);
        }
    }

    getWikipediaDescriptionFromQuery(query: Query) {
        if (!query) return null;

        const pages = query.pages;
        const keyPages = Object.values(pages);
        return keyPages[0]?.extract ?? null;
    }

    encodeNameForTeleport = (name: string) => name.split(' ').join('-').toLowerCase();
}
