import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdsService } from './ads.service';
import { Ad } from './models/ad.model';
import { AdsController } from './ads.controller';

@Module({
  providers: [AdsService],
  imports: [TypeOrmModule.forFeature([Ad])],
  exports: [AdsService],
  controllers: [AdsController]
})
export class AdsModule {}
