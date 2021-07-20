import { CityPillars } from "src/city-pillars/models/city-pillars.model";
import { Country } from "src/countries/models/country.model";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class City {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    image: string;

    @Column({ default: 0 })
    rank: number;

    @Column({ default: 0 })
    voteCount: number;

    @Column({ nullable: true })
    description: string;

    @ManyToOne(type => Country)
    @JoinColumn({ name: 'country_id' })
    country: Country;

    @OneToMany(type => CityPillars, cityPillars => cityPillars.city)
    pillars?: CityPillars[];
}