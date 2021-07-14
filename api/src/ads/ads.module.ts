import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdsService } from './ads.service';
import { Ad } from './models/ad.model';

@Module({
  providers: [AdsService],
  imports: [TypeOrmModule.forFeature([Ad])],
  exports: [AdsService]
})
export class AdsModule {}
