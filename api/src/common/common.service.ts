import { Injectable } from '@nestjs/common';
import axios from 'axios';

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
}
