import { Country } from "src/countries/models/country.model";
import { City } from "../../cities/models/city.model";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Salary {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    jobTitle: string;

    @Column()
    salary: number;

    @ManyToOne(type => Country, type => City)
    @JoinColumn({ name: 'entity_id' })
    entity: Country | City;
}