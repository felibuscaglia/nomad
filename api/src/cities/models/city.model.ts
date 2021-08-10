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

    @Column({ default: 0 })
    voteCount: number;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    population?: number;

    @Column({ nullable: true, type: 'decimal' })
    weatherAverageHigh?: number;

    @Column({ nullable: true, type: 'decimal' })
    weatherAverageLow?: number;

    @Column({ nullable: true, type: 'decimal' })
    avgDayLength?: number;

    @Column({ nullable: true })
    weatherType?: string;

    @Column({ nullable: true, type: 'decimal' })
    rainyDaysPerYear?: number

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
    cities?: SubPillar[];
}