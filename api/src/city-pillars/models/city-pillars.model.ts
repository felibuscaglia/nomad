import { City } from "src/cities/models/city.model";
import { Pillar } from "src/pillars/models/pillar.model";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class CityPillars {
    @Column()
    score: number;

    @ManyToOne(type => City, city => city.pillars, { primary: true })
    city: City;

    @ManyToOne(type => Pillar, pillar => pillar.cities, { primary: true })
    pillar: Pillar;
}