import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import { UrbanAreaImagesDTO } from '../cities/dto/teleport.dto';
import { CityImage } from './models/city-image.model';

@Injectable()
export class CityImagesService {
    constructor(
        @InjectRepository(CityImage)
        private readonly cityImagesRepository: Repository<CityImage>
    ) { }

    saveCityImage = async (href: string) => {
        try { 
            const cityImageDTO = await axios.get<UrbanAreaImagesDTO>(href);
            const { photographer, site } = cityImageDTO.data.photos[0]?.attribution;
            const cityImage: CityImage = {
                photographer,
                site,
                image: cityImageDTO.data.photos[0]?.image?.web,
            };
            return await this.cityImagesRepository.save(cityImage);
        } catch(err) {
            console.error(err);
        }
    }
}
