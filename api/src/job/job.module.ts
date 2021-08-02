import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './models/job.model';
import { JobService } from './job.service';
import { JobController } from './job.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Job])],
    providers: [JobService],
    exports: [JobService],
    controllers: [JobController]
})
export class JobModule {}
