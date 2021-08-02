import { Country } from "../../countries/models/country.model";
import { Column, Entity, ManyToOne } from "typeorm";
import { Job } from "../../job/models/job.model";

@Entity()

export class CountrySalary {
    @Column()
    salary: number;

    @ManyToOne(type => Country, city => city.jobs, { primary: true })
    country: Country;

    @ManyToOne(type => Job, job => job.cities, { primary: true })
    job: Job;
}