import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Query, WikipediaDTO } from 'src/cities/dto/wikipedia.dto';
import { CityImage } from '../city-images/models/city-image.model';
import { UnsplashImageDTO } from './dto';

@Injectable()
export class CommonService {
    constructor() { }

    async getImages(query: string, isCity: boolean): Promise<CityImage | string> {
        const unsplashApiUrl = process.env.UNSPLASH_API_URL;
        const unsplashApiKey = process.env.UNSPLASH_ACCESS_KEY;
        try {
            const unsplashDTO = await axios.get<UnsplashImageDTO>(`${unsplashApiUrl}/search/photos?query=${query}&client_id=${unsplashApiKey}`);
            const unsplashResponse = unsplashDTO.data;
            if (!unsplashResponse?.total) return null;
            const image = unsplashResponse?.results[0]?.urls?.regular
            if (!isCity) return image || null;
            return {
                photographer: unsplashResponse?.results[0]?.user?.username,
                site: 'Unsplash',
                image
            }
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
