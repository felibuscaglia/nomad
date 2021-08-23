import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Country } from '../../countries/models/country.model';

@Entity()
export class CountryWeather {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    month: string;

    @Column()
    tAvg: number;

    @Column()
    pAvg: number;

    @ManyToOne(type => Country)
    @JoinColumn({ name: 'country_id' })
    country: Country;
}