import { Country } from "src/countries/models/country.model";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class City {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    image: string;

    @ManyToOne(type => Country)
    @JoinColumn({ name: 'country_id' })
    country: Country;
}