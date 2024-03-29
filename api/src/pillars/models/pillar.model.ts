import { CityPillars } from "../../city-pillars/models/city-pillars.model";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SubPillar } from "../../sub-pillars/models/sub-pillars.model";

@Entity()
export class Pillar {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ unique: true })
    name: string;

    @OneToMany(type => CityPillars, cityPillars => cityPillars.pillar)
    cities?: CityPillars[];

    @OneToMany(type => SubPillar, subPillar => subPillar.pillar)
    subPillars?: SubPillar[];
}