import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pillar } from './models/pillar.model';
import { PillarsService } from './pillars.service';

@Module({
  providers: [PillarsService],
  imports: [TypeOrmModule.forFeature([Pillar])],
  exports: [PillarsService]
})
export class PillarsModule {}
