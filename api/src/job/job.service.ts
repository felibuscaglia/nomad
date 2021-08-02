import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './models/job.model';

@Injectable()
export class JobService {
    constructor(
        @InjectRepository(Job)
        private readonly jobRepository: Repository<Job>
    ) { }

    createJob = async (job: Job) => await this.jobRepository.save(job);

    findJob = async (title: string) => await this.jobRepository.findOne({ where: { title } });

    findAllJobs = () => this.jobRepository.find();
}
