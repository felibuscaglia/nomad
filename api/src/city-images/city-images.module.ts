import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityImagesService } from './city-images.service';
import { CityImage } from './models/city-image.model';

@Module({
  providers: [CityImagesService],
  imports: [TypeOrmModule.forFeature([CityImage])],
  exports: [CityImagesService]
})
export class CityImagesModule {}
