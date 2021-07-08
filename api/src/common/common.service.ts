import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CommonService {
    constructor() { }

    async getImages(query: string, isCity: boolean) {
        const unsplashApiUrl = process.env.UNSPLASH_API_URL;
        const unsplashApiKey = process.env.UNSPLASH_ACCESS_KEY;
        const convertedQuery = isCity ? `${query} city` : `${query} country`;
        try {
            const unsplashDTO = await axios.get(`${unsplashApiUrl}/search/photos?query=${convertedQuery}&client_id=${unsplashApiKey}`);
            const unsplashResponse = unsplashDTO.data;
            if (!unsplashResponse?.total) return null;
            else return unsplashResponse?.results[0]?.urls?.regular || null;
        } catch (err) {
            return null;
        }
    }
}
