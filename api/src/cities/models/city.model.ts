import { CityImage } from "../../city-images/models/city-image.model";
import { CityPillars } from "../../city-pillars/models/city-pillars.model";
import { Country } from "../../countries/models/country.model";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CitySalary } from "../../salary/models/salary.model";
import { SubPillar } from "../../sub-pillars/models/sub-pillars.model";

@Entity()
export class City {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name: string;

    @Column({ default: 0 })
    rank: number;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    population?: number; // TODO: Display population

    @Column({ default: null, type: 'decimal' })
    latitude: number;

    @Column({ default: null, type: 'decimal' })
    longitude: number;

    @ManyToOne(type => Country)
    @JoinColumn({ name: 'country_id' })
    country: Country;

    @OneToMany(type => CityPillars, cityPillars => cityPillars.city)
    pillars?: CityPillars[];

    @OneToOne(() => CityImage)
    @JoinColumn({ name: 'image_id' })
    image: CityImage;

    @OneToMany(type => CitySalary, countrySalary => countrySalary.city)
    jobs?: CitySalary[];

    @OneToMany(type => SubPillar, subPillar => subPillar.city)
    subPillars?: SubPillar[];
}