import { Country } from "../../countries/models/country.model";
import { Column, Entity, ManyToOne } from "typeorm";
import { Job } from "../../job/models/job.model";
import { City } from "src/cities/models/city.model";

@Entity()

export class CountrySalary {
    @Column()
    salary: number;

    @ManyToOne(type => Country, country => country.jobs, { primary: true })
    country: Country;

    @ManyToOne(type => Job, job => job.countries, { primary: true })
    job: Job;
}

@Entity() 
export class CitySalary {
    @Column()
    salary: number;

    @ManyToOne(type => City, city => city.jobs, { primary: true })
    city: City;

    @ManyToOne(type => Job, job => job.cities, { primary: true })
    job: Job;
}