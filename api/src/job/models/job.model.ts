import { CountrySalary } from "../../salary-country/models/country-salary.model";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class Job {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    title: string;

    @OneToMany(type => CountrySalary, countrySalary => countrySalary.job)
    cities?: CountrySalary[];
}